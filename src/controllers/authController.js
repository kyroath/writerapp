const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.__v = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body.password || req.body.password.length < 8)
    return next(
      new AppError('Password must be longer than 8 characters.', 400)
    );
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!password || !(email || username))
    return next('Please provide an email/username and password.', 400);

  const user = await User.findOne({
    $or: [{ username }, { email }]
  }).select('+password');

  if (!user || !(await user.checkPassword(String(password), user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

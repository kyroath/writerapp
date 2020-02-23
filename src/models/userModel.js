const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    maxlength: 128,
    lowercase: true,
    required: [true, 'A user must have a username.'],
    unique: [true, 'Username already in use.']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'A user must have an associated email.'],
    unique: [true, 'Email already in use.'],
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    minlength: 8,
    select: false
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    select: false
  },
  __v: {
    type: Number,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function(candidate, password) {
  return await bcrypt.compare(candidate, password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

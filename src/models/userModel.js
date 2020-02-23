const mongoose = require('mongoose');
const validator = require('validator');

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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    select: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

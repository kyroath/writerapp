const User = require('../models/userModel');

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./handlerFactory');

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);

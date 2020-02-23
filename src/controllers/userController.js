const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./handlerFactory');

exports.getAllUsers = getAll();
exports.getUser = getOne();
exports.createUser = createOne();
exports.updateUser = updateOne();
exports.deleteUser = deleteOne();

const UserModel = require('./models/user');

const findUserByEmail = async (email) => {
  const [user] = await UserModel.find({ email })
    .where('deletedAt')
    .equals(null);

  return user;
};

const findById = async (id) => {
  const user = await UserModel.findById(id, { password: 0 })
    .where('deletedAt')
    .equals(null);

  return user;
};

const create = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};

const updateById = async (id, data) => {
  const user = await UserModel.findByIdAndUpdate(id, { $set: data })
    .where('deletedAt')
    .equals(null);

  return user;
};

module.exports = {
  create,
  findUserByEmail,
  updateById,
  findById,
};

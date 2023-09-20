const UserModel = require('./models/user');

const findUserByEmail = async (email) => {
  const [user] = await UserModel.find({ email })
    .where('deletedAt')
    .equals(null);

  return user;
};

const create = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};

module.exports = {
  create,
  findUserByEmail,
};

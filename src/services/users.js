const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const filesService = require('../services/files');
const userRepository = require('../db/users');
const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');
const { JWT_SECRET } = require('../constants/env');

const register = async ({ avatar, ...data }) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const imagePath = await filesService.saveFile(avatar);

  const user = await userRepository.create({
    ...data,
    password: passwordHash,
    avatar: { url: imagePath, filename: data.name },
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: 'User with given email not found',
    });
    throw error;
  }

  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid) {
    const error = createError(ERROR_TYPES.UNAUTHORIZED, {
      message: 'Email or password is incorrect',
    });
    throw error;
  }

  const serializedUser = user.toObject();
  delete serializedUser.password;

  const token = jwt.sign(
    { sub: serializedUser._id, role: serializedUser.role },
    JWT_SECRET,
    { expiresIn: 3600 },
  );

  return { ...serializedUser, token };
};

const findById = async (id) => {
  const user = await userRepository.findById(id);

  return user;
};

const promoteToAdmin = async (id) => {
  await userRepository.updateById(id, { $set: { role: 'admin' } });
};

module.exports = { register, login, findById, promoteToAdmin };

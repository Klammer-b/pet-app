const nodemailer = require('nodemailer');
const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../constants/env');

const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (payload) => {
  try {
    const response = await transporter.sendMail(payload);
    console.log(response);

    return response;
  } catch (err) {
    throw createError(ERROR_TYPES.INTERNAL_SERVER_ERROR, {
      message: 'Mail server error',
      data: err,
    });
  }
};

module.exports = { sendEmail };

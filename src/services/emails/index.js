const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const userService = require('../users');
const { sendEmail } = require('../nodemailer');
const { JWT_SECRET, EMAIL_USERNAME } = require('../../constants/env');

const sendResetPasswordEmail = async (to) => {
  const source = await fs.readFile(
    path.join(__dirname, 'templates', 'reset-password.html'),
    'utf8',
  );

  const template = await Handlebars.compile(source);
  const user = await userService.findByEmail(to);
  const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: 3600,
  });

  const output = template({
    name: user.name,
    link: `https://google.com/`,
  });

  await sendEmail({
    to,
    from: EMAIL_USERNAME,
    subject: 'Reset password',
    html: output,
  });
};

module.exports = {
  sendResetPasswordEmail,
};

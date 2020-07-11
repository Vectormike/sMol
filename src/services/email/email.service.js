const nodemailer = require('nodemailer');
const Email = require('email-templates');
const config = require('../../config/config');
const logger = require('../../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send Welcome email
 * @param {string} to
 */
const sendWelcomeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@servit.com',
    },
    send: true,
    transport,
  });

  email.send({
    template: 'welcomeMessage',
    message: {
      to: user.email,
    },
    locals: {
      productName: 'Servit',
      name: user.name,
    },
  });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (user, token) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@servit.com',
    },
    send: true,
    transport,
  });

  email.send({
    template: 'passwordReset',
    message: {
      to: user.email,
    },

    locals: {
      name: user.name,
      productName: 'Servit',
      passwordResetUrl: `http://link-to-app/reset-password?token=${token}`,
    },
  });
};

const sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@servit.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport,
  });

  email.send({
    template: 'passwordChange',
    message: {
      to: user.email,
    },
    locals: {
      productName: 'Servit',
      name: user.name,
    },
  });
};

module.exports = {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendPasswordChangeEmail,
};

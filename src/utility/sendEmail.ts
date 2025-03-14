import nodemailer from 'nodemailer';
import config from '../app/config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.admin_email,
      pass: config.app_pass,
    },
  });

  await transporter.sendMail({
    from: 'ishtiak.sparrow98@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};

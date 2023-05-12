const nodeMailer = require("nodemailer");
require("dotenv/config");

const transport = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_FROM_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});
exports.sendMail = (email, subject, htmlContent) => {
  const options = {
    from: '"GroCeRy Store" <mailConfig.FROM_ADDRESS>',
    to: email,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};

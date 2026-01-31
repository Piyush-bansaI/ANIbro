const nodemailer = require('nodemailer');

const defineMail = nodemailer.createTransport({
    host: process.env.SMTP_Host,
    secure: true,
    port: process.env.SMTP_port,
    auth: {
        user: process.env.ANIbro_mail,
        pass: process.env.ANIbro_pass
    }
});

module.exports = defineMail
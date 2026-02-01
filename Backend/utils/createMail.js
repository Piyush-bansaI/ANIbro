const nodemailer = require('nodemailer');

let transporter;

if (process.env.NODE_ENV !== "production") {
  console.log("\x1b[94myou are in development mode!\x1b[0m")
  transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,                         
    auth: {
      user: process.env.ANIbro_mail,      
      pass: process.env.ANIbro_pass,      
    },
  });
}

module.exports = defineMail
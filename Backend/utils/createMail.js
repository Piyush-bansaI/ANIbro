const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== "production") {
const defineMail = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,                         
      auth: {
        user: process.env.ANIbro_mail,      
        pass: process.env.ANIbro_pass,      
      },
    });
  
  module.exports = defineMail
} else {
  return console.log("back")
}

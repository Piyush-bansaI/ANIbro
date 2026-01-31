const nodemailer = require('nodemailer');

let transporter;

if (process.env.NODE_ENV === "production") {
  
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,          
    port: Number(process.env.SMTP_PORT),  
    secure: false,                        
    auth: {
      user: process.env.ANIbro_USER,      
      pass: process.env.ANIbro_KEY,       
    },
  });
} else {
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
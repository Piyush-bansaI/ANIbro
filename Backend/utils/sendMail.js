const fs = require('fs');
const path = require('path');
const defineMail = require('./createMail');
const { default: axios } = require('axios');

const sendEmail = async (token, username, email) => {
    const body = fs.readFileSync(
        path.join(__dirname, "./mailBody/index.html"),'utf-8'
    )
    
    const sendUrl = `${process.env.frontend_url}/verify/${token}`;
    const finalBody = body.replace("{{link}}", sendUrl) 
    try {
        console.log("\x1b[93mSending Mail\x1b[0m")
        if (process.env.NODE_ENV === 'production') {
            console.log("\x1b[94msending using brevo\x1b[0m")
            await axios.post(
                "https://api.brevo.com/v3/smtp/email",
                {
                    sender: {
                        name: 'ANIbro',
                        email: process.env.ANIbro_mail
                    },
                    to: [{
                        email: email,
                        username: username
                    }],
                    subject: `ANIbro verification Link`,
                    htmlContent: finalBody
                },
                {
                    headers: {
                        'api-key': process.env.BREVO_API,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("\x1b[92msent mail using Brevo\x1b[0m")
        } else {
            console.log("x1b[95msending mail using smtpx1b[0m")
            await defineMail.sendMail({
                from: `"ANIbro" <${process.env.ANIbro_mail}>`,
                to: email,
                subject: `ANIbro verification Link`,
                html: finalBody
            })
        }
    } catch (error) {
        console.log("err: ",error?.response || error)
    }
}

module.exports = sendEmail;
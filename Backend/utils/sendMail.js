const fs = require('fs');
const path = require('path');
const defineMail = require('./createMail')

const sendEmail = async (token, username, email) => {
    const body = fs.readFileSync(
        path.join(__dirname, "./mailBody/index.html"),'utf-8'
    )
    
    const sendUrl = `http://localhost:5173/verify/${token}`;
    const finalBody = body.replace("{{link}}", sendUrl)
    const mail = process.env.NODE_ENV === "production" ?process.env.ANIbro_USER : process.env.ANIbro_mail
    try {
        
        await defineMail.sendMail({
            from: `"ANIbro" <${mail}>`,
            to: email,
            subject: `ANIbro verification Link`,
            html: finalBody
        })
    } catch (error) {
        console.log("err: ", error)
    }
}

module.exports = sendEmail;
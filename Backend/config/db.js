const mongoose = require("mongoose")

const connectTodb = () => {
    mongoose.connect(process.env.ANIbro_URI).then(() => {
        console.log("\x1b[1;92mConnected to database\x1b[0m")
    })
}

module.exports = connectTodb
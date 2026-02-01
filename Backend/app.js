const express = require('express');
const morgan = require('morgan');
const env = require("dotenv")
env.config()
const cors = require("cors")
const cookie = require('cookie-parser');
const ANIbroDB = require('./config/db');
ANIbroDB()
const authRouter = require("./routes/bro.routes")
const broRouter = require('./routes/broLogin.routes');

if (process.env.NODE_ENV === "production") {
    console.log("\x1b[93mProduction mode\x1b[0m")
} else {
    console.log('\x1b[92mdevelopment mode\x1b[0m')
}
const app = express()
const port = process.env.PORT || 3000

app.use(cookie())
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    origin: ['http://localhost:5173', process.env.frontend_url],
    credentials: true
}))
const recommendRouter = require('./routes/AI.routes');


app.use("/auth", authRouter)
app.use("/user", broRouter)
app.use("/ai", recommendRouter)

app.listen(port, () => {
    console.log("the backend is running at port", port)
})
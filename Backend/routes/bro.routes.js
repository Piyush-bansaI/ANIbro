const express = require('express')
const ANIbroModel = require("../models/bros")
const {body, validationResult, cookie} = require('express-validator');
const bcrypt = require('bcrypt')
const emailVerify = require("../utils/sendMail")
const crypto = require('crypto');
const createToken = require('../createToken');

const router = express.Router()

router.get("/check-username", async (req, res) => {
    const {username} = req.query;

    const getUser = await ANIbroModel.findOne({username})

    if (getUser) {
        return res.status(409).json({message: 'it already exists bro'})
    }
    
    return res.status(200).json({message: 'this one is unique!'})
    
})

router.post("/signup",
    body('username').trim().isLength({min: 5}),
    body('email').trim().isEmail().isLength({min: 10}),
    body('password').trim().isLength({min: 8}),
    async (req, res) => {

    const err = validationResult(req)
    if (!err.isEmpty()) return res.status(400).json({
        message: 'input is not valid'
    })
    if (err.isEmpty()) {
        const {username, email, password, isAdult} = req.body

        const existingMember = await ANIbroModel.findOne({
            username
        })

        if (existingMember) return res.status(400).json({message: "Username already exists"})


        const private_pass = await bcrypt.hash(password, 10)

        const token = crypto.randomBytes(32).toString('hex')
        
        await ANIbroModel.create({
            username,
            email,
            password: private_pass,
            isAdult,
            isVerified: false,
            token: token,
            validTime: Date.now() + 15 * 60 * 1000,
            avatar: 'coolGoku'
        })

        await emailVerify(token, username, email)

        return res.status(201).json({
         message: "User Registered"
         })

    } else {
        res.json({message: err.array()})
    }

    

})

router.post('/token-check', async (req, res) => {
    const {token} = req.body

    const getUserToken = await ANIbroModel.findOne({token})

    if (!getUserToken) {
        return res.status(400).json({message: "invalid or expired data"})
    }

    if (Date.now() <= getUserToken.validTime) {
        getUserToken.isVerified = true
        getUserToken.token = undefined
        getUserToken.validTime = undefined
        await getUserToken.save()

        createToken(res, getUserToken);

        return res.status(200).json({message: "Email Verified"})
    } else {
        getUserToken.token = undefined
        getUserToken.validTime = undefined
        await getUserToken.save()
        return res.status(400).json({message: "Times Up!, email not verified"})
    }

})

router.post('/login',
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min: 3})
    , async (req, res) => {

        const err = validationResult(req)

        if (!err.isEmpty()) return res.status(422).json({ message: err.array() })

    const {username, password} = req.body

    const data = await ANIbroModel.findOne({username})

    if (!data) return res.status(401).json({message:'Username or Password is invalid'})

    const compare_pass = await bcrypt.compare(password, data.password)

    if (!compare_pass) return res.status(401).json({message: 'Username or Password is invalid'})

    createToken(res, data);

    return res.status(200).json({message: 'Successfully logged in, welcome back bro!'})
})



module.exports = router
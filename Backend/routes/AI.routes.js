const express = require('express');
const axios = require('axios')
const router = express.Router()
const authMiddleware = require('../middlewares/cookieAuth');
const ANIbroModel = require('../models/bros');
const exists = require('../usefullFunctions/userExists');

const AI = axios.create({baseURL: process.env.AI_URL || 'http://10.245.53.30:3001'})

router.use(authMiddleware)

router.post("/anime-recommender", async (req, res) => {
    const {id} = req.bro;

    const getUser = await ANIbroModel.findById(id)

    if (exists(getUser, res)) return

    const userGenres = getUser.genres
    
    if (userGenres?.length === 0) return res.status(200).json({
        message: 'user didn\'t gave any fav genre'
    })

    try {
        const getANIRecomendation = await AI.post('/recommend-anime', {
            genres: userGenres
        })
        return res.status(200).json({
            genre: getANIRecomendation.data.genre
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message
        })
    }

})
router.post("/manga-recommender", async (req, res) => {
    const {id} = req.bro;

    const getUser = await ANIbroModel.findById(id)

    if (exists(getUser, res)) return

    const userGenres = getUser.genres

    if (userGenres?.length === 0) return res.status(200).json({
        message: 'user didn\'t gave any fav genre'
    })

    try {
        const getMANRecomendation = await AI.post('/recommend-manga', {
            genres: userGenres
        })
        return res.status(200).json({
            'genre': getMANRecomendation.data.genre
        })
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router
const express = require('express');
const authMiddleware = require('../middlewares/cookieAuth');
const ANIbroModel = require('../models/bros');
const createToken = require('../createToken');
const chaining = require('../usefullFunctions/chaining/chaining');
const { default: axios } = require('axios');
const userExists = require('../usefullFunctions/userExists');
const router = express.Router()

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        path: '/'
    })

    return res.status(200).json({message: 'Logged out'})
})

router.get('/get-relations', async (req, res) => {
    const {mode, data} = req.query

    if (!mode || !data) return res.status(400).json({
        message: 'Didn\'t got the data'
    })

    try {
        const prequel_data = await chaining(mode, data, "Prequel", "unshift", res)
        const sequel_data = await chaining(mode, data, "Sequel", "push", res)

        if (prequel_data && sequel_data) {
            const combined_chaining = [...prequel_data, Number(data), ...sequel_data]
            return res.status(200).json({message: combined_chaining})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error})
    }
})

router.use(authMiddleware)

router.get('/userData', (req, res) => {
    return res.json({
        broData: req.bro
    })
})

router.post('/save-profile', async (req, res) => {
    const {newImg} = req.body;

    const broData = await ANIbroModel.findById(req.bro.id)

    userExists(broData, res);

    try {
        broData.avatar = newImg
        await broData.save()

        createToken(res, broData)

        return res.status(200).json({message: "New profile picture loaded"})
    } catch (error) {
        return res.status(400).json({message: "Something went wrong"})
    }
})

router.post('/store-genre', async (req, res) => {
    const {id} = req.bro;
    const {genres} = req.body;

    if (!genres) return res.status(400).json({
        message: 'didn\'t got the genres bro'
    })

    const findUser = await ANIbroModel.findByIdAndUpdate(
        id,
        {$set: {genres}},
        {new: true}
    );

    userExists(findUser, res);

    return res.status(200).json({
        message: 'Genres saved!'
    })
})

router.get('/get-data', async (req, res) => {
    const {id} = req.bro;

    const findUser = await ANIbroModel.findById(id)

    userExists(findUser, res);

    const brosGenres = findUser?.genres;
    const aniList = findUser?.animeList;
    const manList = findUser?.mangaList;

    if (!brosGenres) return res.status(200).json({
        message: 'none'
    })

    return res.status(200).json({
        message: 'Data Incoming!',
        data: {
            brosGenres,
            aniList,
            manList
        }
    })
})

router.post('/store-fav-anime', async (req, res) => {
    const {id} = req.bro;
    const {mode, data} = req.body;

    const user = await ANIbroModel.findById(id)

    userExists(user, res);

    const list = mode === "Anime" ? user.animeList : user.mangaList

    const exists = list.some(item => item.mal_id === data.mal_id)
    
    if (exists) return res.status(403).json({
        message: `${mode} Already exists`
    })

    const dataBody = {
        mal_id: data.mal_id ? data.mal_id : data.id,
        images: data?.images,
        title: data?.title,
        title_english: data?.title_english,
        title_japanese: data?.title_japanese,
        synopsis: data?.synopsis ? data?.synopsis.slice(0, 200) : null,
        score: data?.score,
        rating: data?.rating,
        status: data?.status,
        type: data?.type,
        year: data?.year,
        genres: data?.genres,
        season: data?.season,
        episodes: data?.episodes,
        title_synonyms: data?.title_synonyms
    }

    if (mode === "Anime") {
        dataBody.producers = data?.producers
    } else {
        dataBody.authors = data?.authors
    }

    list.unshift(dataBody)
    await user.save()
    

    return res.status(200).json({
        message: `${mode} saved`
    })
})

router.get('/delete-fav-anime', async (req, res) => {
    const {id} = req.bro;
    const {mode, mal_id} = req.query;

    const list = mode === "Anime" ? "animeList" : "mangaList"

    const user = await ANIbroModel.findByIdAndUpdate(
        id,
        {$pull: {[list]: {mal_id}}},
        {new: true}
    )

    userExists(user, res);

    return res.status(200).json({
        message: `${mode} deleted`
    })
})

module.exports = router
const mongoose = require('mongoose')

const broSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [5, "username is too short bro"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [5, "email is too short bro"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "password is too short bro"]
    },
    isAdult: {
        type: Boolean,
        required: true
    },
    isVerified: {
        type: Boolean
    },
    token: {
        type: String
    },
    validTime: {
        type: Date
    },
    avatar: {
        type: String
    },
    genres: {
        type: [String],
        default: []
    },
    animeList: [{
        mal_id: {type: Number},
        images: {type: Object},
        title: {type:String},
        title_english: {type:String},
        title_japanese: {type:String},
        synopsis: {type:String},
        score: {type:Number},
        rating: {type:String},
        status: {type:String},
        type: {type:String},
        year: {type:Number},
        genres: {type:Array},
        season: {type:String},
        episodes: {type:Number},
        title_synonyms: {type:Array},
        producers: {type:Array}
    }],
    mangaList: [{
        mal_id: {type: Number},
        images: {type: Object},
        title: {type:String},
        title_english: {type:String},
        title_japanese: {type:String},
        synopsis: {type:String},
        score: {type:Number},
        rating: {type:String},
        status: {type:String},
        type: {type:String},
        year: {type:Number},
        genres: {type:Array},
        season: {type:String},
        episodes: {type:Number},
        title_synonyms: {type:Array},
        authors: {type:Array}
    }]
})

const bros_data = mongoose.model('bros', broSchema)

module.exports = bros_data
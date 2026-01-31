const jwt = require('jsonwebtoken');


const createToken = async (res, data) => {
    const token = jwt.sign({
        id: data._id,
        username: data.username,
        email: data.email,
        isVerified: data.isVerified,
        isAdult: data.isAdult,
        avatar: data.avatar
    }, process.env.JWT_key, 
    {expiresIn: '30d'})

    await res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

module.exports = createToken;
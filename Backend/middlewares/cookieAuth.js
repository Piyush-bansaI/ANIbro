const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(200).json({message: 'user not logged in'})

    try {
        
        const decode = jwt.verify(token, process.env.JWT_key)
        
        req.bro = decode;
        next()
    } catch (error) {
        return res.status(403).json({message: 'unauthorized'})
    }
}

module.exports = authMiddleware
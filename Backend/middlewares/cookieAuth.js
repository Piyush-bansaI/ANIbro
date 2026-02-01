const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        req.bro = null;
        return next(); 
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_key)
        
        req.bro = decode;
        next()
    } catch (error) {
        return res.status(403).json({message: 'unauthorized'})
    }
}

module.exports = authMiddleware
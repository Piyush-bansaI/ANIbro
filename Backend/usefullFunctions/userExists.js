
const userExists = (data, res) => {
    if (!data) return res.status(401).json({
        message: 'unauthorized'
    })
}

module.exports = userExists
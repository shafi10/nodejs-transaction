const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(404).json('Not authorized, No token found')
    }

    try {
        const decoded = jwt.verify(token , 'Secret')

        req.user= decoded.user
        next()
    } catch (error) {
        console.log(error)
    }
}
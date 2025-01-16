const jwt = require('jsonwebtoken')
require('dotenv').config()

const createJWT = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.SERECT_KEY,{ expiresIn: '2d' })
    } catch (error) {
        console.log(error);
    }
    return token
}

const verifyJWT = (token) => {
    let decode = null
    try {
         decode = jwt.verify(token, process.env.SERECT_KEY);
    } catch (err) {
        console.log(err);
    }

    return decode
}

module.exports = {createJWT,verifyJWT}
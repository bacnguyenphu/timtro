const express = require('express')
const router = express.Router()
const {handleRegister,handleLogin,handleGetInfoUser,handleUpdateUser} = require('../controllers/authControllers')
 
router.post('/register',handleRegister)
router.post('/login',handleLogin)
router.get('/getUser',handleGetInfoUser)
router.put('/update-user',handleUpdateUser)

module.exports= router
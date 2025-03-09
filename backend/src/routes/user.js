const express = require('express')
const router = express.Router()
const {handleGetUsers, handleDeleteUser, handleResetPassUser} = require('../controllers/userController')

router.get('/getUsers',handleGetUsers)
router.delete('/delete-user',handleDeleteUser)
router.put('/reset-password-user', handleResetPassUser)

module.exports = router
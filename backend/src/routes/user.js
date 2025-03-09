const express = require('express')
const router = express.Router()
const {handleGetUsers, handleDeleteUser} = require('../controllers/userController')

router.get('/getUsers',handleGetUsers)
router.delete('/delete-user',handleDeleteUser)

module.exports = router
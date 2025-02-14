const express = require('express')
const router = express.Router()
const {handleGetProvinces} = require('../controllers/addressControllers')

router.get('/getProvincesAll',handleGetProvinces)

module.exports = router

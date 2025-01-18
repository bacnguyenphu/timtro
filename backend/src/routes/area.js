const express = require('express')
const router = express.Router()
const {handleGetArea} = require('../controllers/areaController')

router.get('/getArea',handleGetArea)

module.exports = router
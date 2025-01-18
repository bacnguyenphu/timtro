const express = require('express')
const { handleGetPrice } = require('../controllers/priceController')
const router = express.Router()

router.get('/getPrice',handleGetPrice)

module.exports = router
const express = require('express')
const router = express.Router()
const { handleGetPrice } = require('../controllers/priceController')

router.get('/getPrice',handleGetPrice)

module.exports = router
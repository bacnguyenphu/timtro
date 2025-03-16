const express = require('express')
const router = express.Router()
const { handleGetPrice, handleCreatePrice, handleDeletePrice, handleUpdatePrice } = require('../controllers/priceController')

router.get('/getPrice', handleGetPrice)
router.post('/create-price', handleCreatePrice)
router.delete('/delete-price', handleDeletePrice)
router.put('/update-price', handleUpdatePrice)

module.exports = router
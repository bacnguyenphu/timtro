const express = require('express')
const router = express.Router()
const {handleGetAllCategories} = require('../controllers/categoriesController')

router.get('/getAllCategories',handleGetAllCategories)

module.exports = router
const express = require('express')
const router = express.Router()
const {handleGetAllCategories,handleCreateCategory, handleDeleteCategory,handleUpdateCategory} = require('../controllers/categoriesController')

router.get('/getAllCategories',handleGetAllCategories)
router.post('/create-category',handleCreateCategory)
router.delete('/delete-category',handleDeleteCategory)
router.put('/update-category',handleUpdateCategory)

module.exports = router
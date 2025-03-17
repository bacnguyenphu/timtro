const express = require('express')
const router = express.Router()
const {handleGetArea, handleCreateArea, handleDeleteArea, handleUpdateArea} = require('../controllers/areaController')

router.get('/getArea',handleGetArea)
router.post('/create-area',handleCreateArea)
router.delete('/delete-area', handleDeleteArea)
router.put('/update-area', handleUpdateArea)

module.exports = router
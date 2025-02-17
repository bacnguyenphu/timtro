const express = require('express')
const router = express.Router()
const {handleGetProvinces,handleGetDistricsByProvince,handleGetWardsByDistric} = require('../controllers/addressControllers')

router.get('/getProvincesAll',handleGetProvinces)
router.get('/getDistrics-by-province',handleGetDistricsByProvince)
router.get('/getWards-by-distric',handleGetWardsByDistric)

module.exports = router

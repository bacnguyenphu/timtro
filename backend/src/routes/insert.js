const express = require('express')
const router = express.Router()
const {handleInsertdata,handleInsertAddressTable} = require('../controllers/insertController')

router.post('/insertData',handleInsertdata)
router.post('/insertAddressTable',handleInsertAddressTable)

module.exports = router
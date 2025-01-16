const express = require('express')
const router = express.Router()
const {handleInsertdata} = require('../controllers/insertController')

router.post('/insertData',handleInsertdata)

module.exports = router
const express = require('express')
const router = express.Router()
const {handleGetposts,handleGetPostsByPaginate} = require('../controllers/postController')

router.get('/getPosts',handleGetposts)
router.get('/getPostByPaginate',handleGetPostsByPaginate)

module.exports = router
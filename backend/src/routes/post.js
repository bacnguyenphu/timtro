const express = require('express')
const router = express.Router()
const {handleGetposts,handleGetPostsByPaginate,handleCreateNewPost} = require('../controllers/postController')

router.get('/getPosts',handleGetposts)
router.get('/getPostByPaginate',handleGetPostsByPaginate)
router.post('/createNewPost',handleCreateNewPost)

module.exports = router
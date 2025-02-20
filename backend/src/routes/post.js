const express = require('express')
const router = express.Router()
const {handleGetposts,handleGetPostsByPaginate,handleCreateNewPost,handleGetPostByIDUser} = require('../controllers/postController')

router.get('/getPosts',handleGetposts)
router.get('/getPostByPaginate',handleGetPostsByPaginate)
router.post('/createNewPost',handleCreateNewPost)
router.get('/get-post-by-idUser',handleGetPostByIDUser)

module.exports = router
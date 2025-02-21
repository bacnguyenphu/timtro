const express = require('express')
const router = express.Router()
const {handleGetposts,handleGetPostsByPaginate,handleCreateNewPost,handleGetPostByIDUser,handleDeletePostByID,handleUpdatePostByID,handleGetPostByID} = require('../controllers/postController')

router.get('/getPosts',handleGetposts)
router.get('/getPostByPaginate',handleGetPostsByPaginate)
router.get('/get-post-by-id',handleGetPostByID)
router.post('/createNewPost',handleCreateNewPost)
router.get('/get-post-by-idUser',handleGetPostByIDUser)
router.delete('/delete-post-by-id',handleDeletePostByID)
router.put('/update-post-by-id',handleUpdatePostByID)

module.exports = router
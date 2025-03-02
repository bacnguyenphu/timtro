const express = require('express')
const router = express.Router()
const { handleGetposts, handleGetPostsByPaginate, handleCreateNewPost,
    handleGetPostByIDUser, handleDeletePostByID, handleUpdatePostByID,
    handleGetPostByID, handleLikeAndDislikePostByUser,handleGetPostLikedOfUser } = require('../controllers/postController')

router.get('/getPosts', handleGetposts)
router.get('/getPostByPaginate', handleGetPostsByPaginate)
router.get('/get-post-by-id', handleGetPostByID)
router.post('/createNewPost', handleCreateNewPost)
router.get('/get-post-by-idUser', handleGetPostByIDUser)
router.delete('/delete-post-by-id', handleDeletePostByID)
router.put('/update-post-by-id', handleUpdatePostByID)
router.post('/like-dislike-post-by-user', handleLikeAndDislikePostByUser)
router.get('/get-post-is-liked-byIdUser',handleGetPostLikedOfUser)
// router.delete('/dislike-post-by-user', handleDislikeByUser)

module.exports = router
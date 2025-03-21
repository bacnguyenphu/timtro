import axios from "../utils/customAxios";

const getPost = () => {
    return axios.get('getPosts')
}

const getPostByID = (idPost) => {
    return axios.get('get-post-by-id', { params: { idPost } })
}

const getPostByPaginate = (page, limit, category, price, area, isNewPost, address) => {
    return axios.get('getPostByPaginate', { params: { page, limit, category, price, area, isNewPost, address } })
}

const createNewPost = data => {
    return axios.post('createNewPost', data)
}

const getPostsByIDUser = (page, limit, idUser) => {
    return axios.get('get-post-by-idUser', { params: { page, limit, idUser } })
}

const deletePostByID = (idPost) => {
    return axios.delete('delete-post-by-id', { params: { idPost } })
}

const updatePostByID = (data) => {
    return axios.put('update-post-by-id', data)
}

const getPostLikeOfUser = (idUser) => {
    return axios.get('get-post-is-liked-byIdUser', { params: { idUser } })
}

const likeAndDislikePostByUser = (idPost, idUser) => {
    return axios.post('like-dislike-post-by-user', { idPost, idUser })
}

const getPostsLiked = (listId, page, limit) => {

    return axios.get('get-post-liked', { params: { listId, page, limit } })
}

export {
    getPost, getPostByPaginate, createNewPost, getPostsByIDUser,
    deletePostByID, getPostByID, updatePostByID, getPostLikeOfUser,
    likeAndDislikePostByUser, getPostsLiked
}
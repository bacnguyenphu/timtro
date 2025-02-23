const { getPosts, getPostsByPaginate, createNewPost, getPostsByIDUser, deletePostByID, updatePostByID, getPostByID } = require('../services/postServices')

const handleGetposts = async (req, res) => {
    try {
        const messasge = await getPosts()
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetpost", error);
    }
}

const handleGetPostByID = async (req, res) => {
    try {
        let idPost = req.query.idPost
        const messasge = await getPostByID(idPost)

        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetPostByID", error);
    }
}

const handleGetPostsByPaginate = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let category = req.query.category
        let price = req.query.price
        let area = req.query.area
        let isNewPost = req.query.isNewPost
        const messasge = await getPostsByPaginate(+page, +limit, category, price, area, isNewPost)
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetpostByPaginate", error);
    }
}

const handleCreateNewPost = async (req, res) => {
    try {
        let data = req.body
        const messasge = await createNewPost(data)
        console.log('check data>>', data);

        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleCreateNewPost", error);
    }
}

const handleGetPostByIDUser = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let idUser = req.query.idUser
        const messasge = await getPostsByIDUser(+page, +limit, idUser)

        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleCreateNewPost: ", error);
    }
}

const handleDeletePostByID = async (req, res) => {
    try {
        let idPost = req.query.idPost
        const message = await deletePostByID(idPost)

        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleCreateNewPost: ", error);
    }
}

const handleUpdatePostByID = async (req, res) => {
    try {
        let data = req.body
        const message = await updatePostByID(data)

        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleUpdatePostByID: ", error);
    }
}

module.exports = { handleGetposts, handleGetPostsByPaginate, handleCreateNewPost, handleGetPostByIDUser, handleDeletePostByID, handleUpdatePostByID,handleGetPostByID }
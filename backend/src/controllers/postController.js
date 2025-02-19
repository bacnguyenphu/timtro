const {getPosts, getPostsByPaginate,createNewPost} = require('../services/postServices')

const handleGetposts = async(req,res)=>{
    try {
        const messasge = await getPosts()
        return res.status(200).json(messasge)       
    } catch (error) {
        console.log("Lỗi ở handleGetpost",error);
    }
}

const handleGetPostsByPaginate = async(req,res)=>{
    try {
        let page = req.query.page
        let limit = req.query.limit
        let category = req.query.category
        let price = req.query.price
        let area = req.query.area
        let isNewPost = req.query.isNewPost

        const messasge = await getPostsByPaginate(+page,+limit,category,price,area,isNewPost)
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetpostByPaginate",error);
    }
}

const handleCreateNewPost = async(req,res)=>{
    try {
        let data = req.body
        const messasge = await createNewPost(data)
        console.log('check data>>',data);
        
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleCreateNewPost",error);
    }
}

module.exports = {handleGetposts,handleGetPostsByPaginate,handleCreateNewPost}
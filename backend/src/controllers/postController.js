const {getPosts, getPostsByPaginate} = require('../services/postServices')

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

        const messasge = await getPostsByPaginate(+page,+limit,category)
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetpostByPaginate",error);
    }
}

module.exports = {handleGetposts,handleGetPostsByPaginate}
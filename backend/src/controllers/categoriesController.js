const {getAllCategories} = require('../services/categoriesServices')

const handleGetAllCategories = async(req,res)=>{
    try {
        const messasge = await getAllCategories()
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetAllCategories: ",error);
    }
}

module.exports = {handleGetAllCategories} 
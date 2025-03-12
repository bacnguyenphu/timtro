const { getAllCategories, createCategory, deleteCategory,updateCategory } = require('../services/categoriesServices')

const handleGetAllCategories = async (req, res) => {
    try {
        const messasge = await getAllCategories()
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleGetAllCategories: ", error);
    }
}

const handleCreateCategory = async (req, res) => {
    try {
        let data = req.body
        const messasge = await createCategory(data)
        return res.status(200).json(messasge)

    } catch (error) {
        console.log('Lỗi ở handleCreateCategory: ', error);

    }
}

const handleDeleteCategory = async (req, res) => {
    try {
        let code = req.query.code
        
        const messasge = await deleteCategory(code)
        return res.status(200).json(messasge)

    } catch (error) {
        console.log("Lỗi ở handleDeleteCategory: ", error);

    }
}

const handleUpdateCategory = async(req,res)=>{
    try {
        let data = req.body
        const messasge = await updateCategory(data)
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleUpdateCategory: ",error);
        
    }
}

module.exports = { handleGetAllCategories, handleCreateCategory, handleDeleteCategory, handleUpdateCategory } 
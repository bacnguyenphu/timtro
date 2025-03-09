const {getUsers, deleteUser} = require('../services/userService')

const handleGetUsers = async(req,res)=>{
    try {
        let page = req.query.page
        let limit = req.query.limit

        const message = await getUsers(+page,+limit)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleGetUsers: ", error);
        
    }
}

const handleDeleteUser = async(req,res)=>{
    try {
        let idUser = req.query.idUser

        const message = await deleteUser(idUser)
        return res.status(200).json(message)
        
    } catch (error) {
        console.log("Lỗi ở handleDeleteUser: ",error);
        
    }
}

module.exports = {handleGetUsers, handleDeleteUser}
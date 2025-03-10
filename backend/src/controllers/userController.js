const { getUsers, deleteUser, resetPassUser } = require('../services/userService')

const handleGetUsers = async (req, res) => {
    try {
        let page = req.query.page
        let limit = req.query.limit

        const message = await getUsers(+page, +limit)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleGetUsers: ", error);

    }
}

const handleDeleteUser = async (req, res) => {
    try {
        let idUser = req.query.idUser

        const message = await deleteUser(idUser)
        return res.status(200).json(message)

    } catch (error) {
        console.log("Lỗi ở handleDeleteUser: ", error);

    }
}

const handleResetPassUser = async (req, res) => {
    try {
        let idUser = req.body.idUser
        const message = await resetPassUser(idUser)
        return res.status(200).json(message)

    } catch (error) {
        console.log("Lỗi ở handleResetPassUser: ", error);

    }
}

module.exports = { handleGetUsers, handleDeleteUser, handleResetPassUser }
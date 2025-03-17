const { getArea, createArea, deleteArea, updateArea } = require('../services/areaSevices')

const handleGetArea = async (req, res) => {
    try {
        const message = await getArea()
        return res.status(200).json(message)

    } catch (error) {
        console.log('Lỗi ở handleGetArea: ', error);

    }
}

const handleCreateArea = async (req, res) => {
    try {
        let data = req.body
        const message = await createArea(data)
        return res.status(200).json(message)

    } catch (error) {
        console.log("Lỗi ở handleCreateArea: ", error);

    }
}

const handleDeleteArea = async (req, res) => {
    try {
        let code = req.query.code
        const message = await deleteArea(code)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleDelete: ", error)
    }
}

const handleUpdateArea = async (req, res) => {
    try {
        let data = req.body
        const message = await updateArea(data)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleUpdateArea: ", error);
    }
}

module.exports = { handleGetArea, handleCreateArea, handleDeleteArea, handleUpdateArea } 
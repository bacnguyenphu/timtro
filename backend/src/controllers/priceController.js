const { getPrice, createPrice, deletePrice, updatePrice } = require("../services/priceServices");

const handleGetPrice = async (req, res) => {
    try {
        const messasge = await getPrice()
        return res.status(200).json(messasge)
    } catch (error) {
        console.log('Lỗi ở handleGetPrice: ', error);
    }
}

const handleCreatePrice = async (req, res) => {
    try {
        const data = req.body
        const message = await createPrice(data)
        return res.status(200).json(message)

    } catch (error) {
        console.log("Lỗi ở handleCreatePrice: ", error);
    }
}

const handleDeletePrice = async (req, res) => {
    try {
        let code = req.query.code
        const message = await deletePrice(code)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleDelete: ", error)
    }
}

const handleUpdatePrice = async (req, res) => {
    try {
        let data = req.body
        const message = await updatePrice(data)
        return res.status(200).json(message)
    } catch (error) {
        console.log("Lỗi ở handleUpdatePrice: ", error);
    }
}

module.exports = { handleGetPrice, handleCreatePrice, handleDeletePrice,handleUpdatePrice }
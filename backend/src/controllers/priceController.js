const { getPrice } = require("../services/priceServices");

const handleGetPrice = async(req,res)=>{
    try {
        const messasge = await getPrice()
        return res.status(200).json(messasge)
    } catch (error) {
        console.log('Lỗi ở handleGetPrice: ', error);
    }
}

module.exports = {handleGetPrice}
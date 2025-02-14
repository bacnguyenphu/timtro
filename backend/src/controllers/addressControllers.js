const {getProvinces} = require('../services/addressServices')

const handleGetProvinces = async(req,res)=>{
    try {

        const message = await getProvinces()
        return res.status(200).json(message)
        
    } catch (error) {
        console.log("Lỗi ở handleGetProvices: ",error);
        
    }
}

module.exports = {handleGetProvinces} 
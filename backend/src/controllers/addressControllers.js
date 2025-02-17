const {getProvinces,getDistricsByProvince,getWardsByDistric} = require('../services/addressServices')

const handleGetProvinces = async(req,res)=>{
    try {

        const message = await getProvinces()
        return res.status(200).json(message)
        
    } catch (error) {
        console.log("Lỗi ở handleGetProvices: ",error);
        
    }
}

const handleGetDistricsByProvince = async(req,res)=>{
    try {

        let code = req.query.code
        const message = await getDistricsByProvince(code)
        return res.status(200).json(message)

    } catch (error) {
        console.log("Lỗi ở handleGetProvinces: ",error);
        
    }
}

const handleGetWardsByDistric = async(req,res)=>{
    try {

        let code = req.query.code
        const message = await getWardsByDistric(code)
        return res.status(200).json(message)
        
    } catch (error) {
        console.log("Lỗi ở handleGetProvinces: ",error);
        
    }
}

module.exports = {handleGetProvinces,handleGetDistricsByProvince,handleGetWardsByDistric} 
const {getArea} = require('../services/areaSevices')

const handleGetArea = async(req,res)=>{
    try {
        const message = await getArea()
        return res.status(200).json(message)

    } catch (error) {
        console.log('Lỗi ở handleGetArea: ',error);
        
    }
}

module.exports = {handleGetArea} 
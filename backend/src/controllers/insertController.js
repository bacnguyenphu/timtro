const {insertData} = require('../services/insertDataServices')

const handleInsertdata =async(req,res)=>{
    try {
        const message = await insertData()
        return res.status(200).json({
            mess:"Insert success"
        })
        
    } catch (error) {
        console.log("Lỗi ở handleInsertdata:  ", error);
        
    }
}

module.exports = {handleInsertdata}
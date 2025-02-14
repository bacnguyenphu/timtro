const {insertData,inserAddress} = require('../services/insertDataServices')

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

const handleInsertAddressTable = async(req,res)=>{
    try {
        const message = await inserAddress()
        return res.status(200).json({
            mess:"Insert success address"
        })
    } catch (error) {
        console.log("Lỗi ở handleInsertAddressTable:  ", error);
    }
}

module.exports = {handleInsertdata,handleInsertAddressTable}
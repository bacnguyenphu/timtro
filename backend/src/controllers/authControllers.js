const {register,login,getInfoUser,updateUser} = require('../services/authSerVices')

const handleRegister = async(req,res)=>{
    try {
       const data = req.body 
       const messasge = await register(data)
       return res.status(200).json(messasge)
        
    } catch (error) {
        console.log("Lỗi ở handleRegister");
        return res.status(500).json({
            err: -999,
            mess:"Error server"
        })
    }
}

const handleLogin = async(req,res)=>{
    try {
        const data = req.body 
        const messasge = await login(data)
        return res.status(200).json(messasge)
         
     } catch (error) {
         console.log("Lỗi ở handleLogin");
         return res.status(500).json({
             err: -999,
             mess:"Error server"
         })
     }
}

const handleGetInfoUser = async(req,res)=>{
    try {
        const phone = req.query.phone
        const messasge = await getInfoUser(phone)
        return res.status(200).json(messasge)
        
    } catch (error) {
        console.log("Lỗi ở handleGetInfoUser: ",error);
        
    }
}

const handleUpdateUser = async(req,res)=>{
    try {
        const data = req.body
        const messasge = await updateUser(data)
        return res.status(200).json(messasge)
    } catch (error) {
        console.log("Lỗi ở handleUpdateUser: ",error);
    }
}

module.exports = {handleRegister,handleLogin,handleGetInfoUser,handleUpdateUser}

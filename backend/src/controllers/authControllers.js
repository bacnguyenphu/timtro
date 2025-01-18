const {register,login} = require('../services/authSerVices')

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

module.exports = {handleRegister,handleLogin}

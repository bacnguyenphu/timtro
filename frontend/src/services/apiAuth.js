import axios from "../utils/customAxios";

const handleLogin = async(data)=>{
    return axios.post('login',data)
}

const handleRegister = async(data)=>{
    return axios.post('register',data)
}

const handleUpdateUser = async(data)=>{
    return axios.put('update-user',data)
}

const handleGetInforUser = async(idUser)=>{
    return axios.get('getUser',{params:{id:idUser}})
}

export {handleLogin,handleRegister,handleUpdateUser,handleGetInforUser}


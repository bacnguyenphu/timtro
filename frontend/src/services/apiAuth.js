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

export {handleLogin,handleRegister,handleUpdateUser}


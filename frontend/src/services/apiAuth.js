import axios from "../utils/customAxios";

const handleLogin = async(data)=>{
    return axios.post('login',data)
}

const handleRegister = async(data)=>{
    return axios.post('register',data)
}

export {handleLogin,handleRegister}


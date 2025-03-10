import axios from '../utils/customAxios'

const getUsers = (page,limit)=>{
    return axios.get('getUsers',{params:{page,limit}})
}

const deleteUser = (idUser)=>{
    return axios.delete('delete-user',{params:{idUser}})
}

const resetPassUser = (idUser)=>{
    return axios.put('reset-password-user',{idUser})
}

export{getUsers, deleteUser, resetPassUser}
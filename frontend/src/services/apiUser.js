import axios from '../utils/customAxios'

const getUsers = (page,limit)=>{
    return axios.get('getUsers',{params:{page,limit}})
}

export{getUsers}
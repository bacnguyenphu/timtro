import axios from "../utils/customAxios";

const getAllCategories = ()=>{
    return axios.get('getAllCategories')
}

export {getAllCategories}
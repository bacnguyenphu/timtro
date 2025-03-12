import axios from "../utils/customAxios";

const getAllCategories = () => {
    return axios.get('getAllCategories')
}

const createCategory = (data) => {
    return axios.post('create-category', data)
}

const deleteCategory = (code) => {
    return axios.delete('delete-category', { params: { code } })
}

const updateCategory = (data)=>{
    return axios.put('update-category',data)
}

export { getAllCategories, createCategory, deleteCategory,updateCategory }
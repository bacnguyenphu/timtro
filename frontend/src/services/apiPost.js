import axios from "../utils/customAxios";

const getPost = ()=>{
    return axios.get('getPosts')
}

const getPostByPaginate = (page,limit,category,price,area,isNewPost)=>{
    return axios.get('getPostByPaginate',{ params: { page,limit,category,price,area,isNewPost}})
}

const createNewPost = data=>{
    return axios.post('createNewPost',data)
}

export {getPost,getPostByPaginate,createNewPost}
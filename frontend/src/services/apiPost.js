import axios from "../utils/customAxios";

const getPost = ()=>{
    return axios.get('getPosts')
}

const getPostByPaginate = (page,limit,category,price)=>{
    return axios.get('getPostByPaginate',{ params: { page,limit,category,price }})
}

export {getPost,getPostByPaginate}
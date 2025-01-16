import axios from "../utils/customAxios";

const getPost = ()=>{
    return axios.get('getPosts')
}

const getPostByPaginate = (page,limit)=>{
    return axios.get('getPostByPaginate',{ params: { page,limit }})
}

export {getPost,getPostByPaginate}
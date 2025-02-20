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

const getPostsByIDUser = (page,limit,idUser)=>{
    return axios.get('get-post-by-idUser',{ params: { page,limit,idUser}})
}

export {getPost,getPostByPaginate,createNewPost,getPostsByIDUser}
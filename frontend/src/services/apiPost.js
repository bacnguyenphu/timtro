import axios from "../utils/customAxios";

const getPost = ()=>{
    return axios.get('getPosts')
}

const getPostByID = (idPost)=>{
    return axios.get('get-post-by-id',{params:{idPost}})
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

const deletePostByID = (idPost)=>{
    return axios.delete('delete-post-by-id',{params:{idPost}})
}

const updatePostByID = (data)=>{
    return axios.put('update-post-by-id',data)
}

export {getPost,getPostByPaginate,createNewPost,getPostsByIDUser,deletePostByID,getPostByID,updatePostByID}
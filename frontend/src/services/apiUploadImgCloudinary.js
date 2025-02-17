import axios from "axios"; 

const uploadImgCloudinary = (data)=>{
    return axios.post('https://api.cloudinary.com/v1_1/dhj8wklmj/image/upload',data)
}

export{uploadImgCloudinary}
import axios from "../utils/customAxios";

const getArea = ()=>{
    return axios.get('getArea')
}

export{getArea}
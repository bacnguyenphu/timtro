import axios from "../utils/customAxios";

const getPrice = ()=>{
    return axios.get('getPrice')
}

export {getPrice}
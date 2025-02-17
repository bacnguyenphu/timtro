import axios from "../utils/customAxios";

const getProvincesAllPl = ()=>{
    return axios.get('getProvincesAll')
}

const getDictricsByProvincesPl =(code)=>{
    return axios.get(`getDistrics-by-province?code=${code}`)
}

const getWardsByDictricsPl = (code)=>{
    return axios.get(`getWards-by-distric?code=${code}`)
}



export {getProvincesAllPl,getDictricsByProvincesPl,getWardsByDictricsPl}
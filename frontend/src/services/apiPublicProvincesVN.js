import axios from 'axios';

const getProvincesAllPl = ()=>{
    return axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
}

const getDictricsByProvincesPl =(code)=>{
    return axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`)
}

const getWardsByDictricsPl = (code)=>{
    return axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`)
}

export {getProvincesAllPl,getDictricsByProvincesPl,getWardsByDictricsPl}
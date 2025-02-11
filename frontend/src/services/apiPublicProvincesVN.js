import axios from 'axios';

const getProvincesAllPl = ()=>{
    return axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
}

export {getProvincesAllPl}
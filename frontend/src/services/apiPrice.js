import axios from "../utils/customAxios";

const getPrice = () => {
    return axios.get('getPrice')
}

const createPrice = (data) => {

    return axios.post('create-price', {
        value: data.value,
        min: data.min,
        max: data.max
    })
}

const deletePrice = (code) => {
    return axios.delete('delete-price', { params: { code } })
}

const updatePrice = (data) => {
    console.log('check data: ',data);
    
    return axios.put('update-price',{
        value: data.value,
        min: data.min,
        max: data.max,
        code: data.code
    })
}

export { getPrice, createPrice, deletePrice, updatePrice }
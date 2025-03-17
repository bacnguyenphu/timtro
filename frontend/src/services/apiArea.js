import axios from "../utils/customAxios";

const getArea = () => {
    return axios.get('getArea')
}

const createArea = (data) => {
    return axios.post('create-area', {
        value: data.value,
        min: `${data.min}`,
        max: data.max
    })
}

const deleteArea = (code) => {
    return axios.delete('delete-area', { params: { code } })
}

const updateArea = (data) => {

    return axios.put('update-area', {
        value: data.value,
        min: data.min,
        max: data.max,
        code: data.code
    })
}

export { getArea, createArea, deleteArea, updateArea }
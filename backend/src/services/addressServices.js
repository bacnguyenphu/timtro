const { where } = require('sequelize');
const db = require('../models/index')

const getProvinces = async()=>{
    try {
        const provinces = await db.Province.findAll({
            attributes: ['name', 'type', 'slug', 'name_with_type', 'code'],
        })

        return{
            err: 0,
            mess: "get provinces succsess",
            provinces
        }
        
    } catch (error) {
        console.log('Lỗi ở getProvinces; ',error);
        return{
            err: -999,
            mess: "Error server",
            provinces:[]
        }
    }
}

const getDistricsByProvince = async(code)=>{
    try {

        const districs = await db.Distric.findAll({
            // attributes: ['name', 'type', 'slug', 'name_with_type', 'code'],
            where:{parent_code:code}
        })

        return{
            err: 0,
            mess: "get districs succsess",
            districs
        }
        
    } catch (error) {
        console.log('Lỗi ở getDistricsByProvince; ',error);
        return{
            err: -999,
            mess: "Error server",
            districs:[]
        }
    }
}

const getWardsByDistric = async(code)=>{
    try {

        const wards = await db.Ward.findAll({
            // attributes: ['name', 'type', 'slug', 'name_with_type', 'code'],
            where:{parent_code:code}
        })

        return{
            err: 0,
            mess: "get wards succsess",
            wards
        }
        
    } catch (error) {
        console.log('Lỗi ở getWardsByDistric; ',error);
        return{
            err: -999,
            mess: "Error server",
            wards:[]
        }
    }
}

module.exports = { getProvinces,getDistricsByProvince,getWardsByDistric }
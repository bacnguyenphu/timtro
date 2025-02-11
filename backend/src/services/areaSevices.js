const db = require('../models/index')

const getArea = async () => {
    try {
        const area = await db.Area.findAll({
            attributes:['id','value','code','order']
        })
        return{
            err: 0,
            mess: "Get area success!!",
            area:area,
            filter:'area'
        }
    } catch (error) {
        console.log("Lỗi ở getArea: ",error);
        return{
            err: -999,
            mess: "Error server",
            area:[]
        }
    }
}

module.exports = { getArea }
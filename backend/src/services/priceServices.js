const db = require('../models/index')

const getPrice =async()=>{
    try {
        let prices = await db.Price.findAll({
            attributes:['id','value','code','order','min','max'],
            order: [
                ['min', 'ASC'],
            ]
        })
        return{
            err:0,
            mess:"Get price succsess!",
            price:prices,
            filter: 'price'
        }

    } catch (error) {
        console.log("Lỗi ở getPrice: ",error);
        return{
            err:-999,
            mess:"Error Server!!",
            price:[]
        }
    }
}

module.exports = {getPrice}
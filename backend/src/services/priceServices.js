const db = require('../models/index')
const { generateCode } = require('../utils/generateCode ')

const getPrice = async () => {
    try {
        let prices = await db.Price.findAll({
            attributes: ['id', 'value', 'code', 'order', 'min', 'max'],
            order: [
                ['min', 'ASC'],
            ]
        })
        return {
            err: 0,
            mess: "Get price succsess!",
            price: prices,
            filter: 'price'
        }

    } catch (error) {
        console.log("Lỗi ở getPrice: ", error);
        return {
            err: -999,
            mess: "Error Server!!",
            price: []
        }
    }
}

const createPrice = async (data) => {
    try {
        if (!data.min) {
            return {
                err: 1,
                mess: "Min is required",
            }
        }

        if (!data.value) {
            return {
                err: 4,
                mess: "Value is required",
            }
        }

        const price = await db.Price.findOne({
            where: { value: data.value }
        });

        if (price) {
            return {
                err: 3,
                mess: "Price is exist",
            }
        }

        await db.Price.create({
            code: generateCode(data.value),
            value: data.value,
            min: +data.min,
            max: (!data.max || data.max === '') ? null : +data.max,
        })

        return {
            err: 0,
            mess: "Create price success!"
        }

    } catch (error) {
        console.log("Lỗi ở createPrice: ", error);

        return {
            err: -999,
            mess: `Error Server!! : ${error}`,
        }
    }
}

const deletePrice = async (code) => {
    try {
        if (!code) {
            return {
                err: 1,
                mess: "Code is required !"
            }
        }

        const price = await db.Price.findOne({
            where: { code: code }
        })

        if (!price) {
            return {
                err: 2,
                mess: "Price is not exist"
            }
        }

        const post = await db.Post.findOne({
            where: { priceCode: code }
        }
        )

        if (post) {
            return {
                err: 3,
                mess: "Delete dosen't success because this price has posts"
            }
        }

        await db.Price.destroy({
            where: { code: code }
        })

        return {
            err: 0,
            mess: "Delete price success !"
        }

    } catch (error) {
        console.log("Lỗi ở delêtPrice: ", error);
        return {
            err: -999,
            mess: `Error Server!! : ${error}`,
        }
    }
}

const updatePrice = async (data) => {
    try {
        if (!data.min) {
            return {
                err: 1,
                mess: "Min is required",
            }
        }
        if (!data.max) {
            return {
                err: 2,
                mess: "Max is required",
            }
        }
        if (!data.value) {
            return {
                err: 4,
                mess: "Value is required",
            }
        }
        if (!data.code) {
            return {
                err: 3,
                mess: "Value is required",
            }
        }

        const price = await db.Price.findOne({
            where: { code: data.code }
        })

        if (!price) {
            return {
                err: 5,
                mess: "Price is not exist"
            }
        }

        await db.Price.update(
            {
                value: data.value,
                min: +data.min,
                max: +data.max,
            },
            {
                where: {
                    code: data.code,
                },
            },
        )

        return {
            err: 0,
            mess: 'Update price success !'
        }

    } catch (error) {
        console.log("Lỗi ở updatePrice: ", error);
        return {
            err: -999,
            mess: `Error Server!! : ${error}`,
        }
    }
}

module.exports = { getPrice, createPrice, deletePrice, updatePrice }
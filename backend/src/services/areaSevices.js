const db = require('../models/index')
const { generateCode } = require('../utils/generateCode ')

const getArea = async () => {
    try {
        const area = await db.Area.findAll({
            attributes: ['id', 'value', 'code', 'order', 'min', 'max'],
            order: [
                ['min', 'ASC'],
            ]
        })
        return {
            err: 0,
            mess: "Get area success!!",
            area: area,
            filter: 'area'
        }
    } catch (error) {
        console.log("Lỗi ở getArea: ", error);
        return {
            err: -999,
            mess: "Error server",
            area: []
        }
    }
}

const createArea = async (data) => {
    try {
        console.log('check data: ', data);

        if (!data.min) {
            return {
                err: 1,
                mess: "Min is required",
            }
        }

        if (!data.value) {
            return {
                err: 2,
                mess: "Value is required",
            }
        }

        const area = await db.Area.findOne({
            where: { value: data.value }
        });

        if (area) {
            return {
                err: 3,
                mess: "Area is exist",
            }
        }

        await db.Area.create({
            code: generateCode(data.value),
            value: data.value,
            min: +data.min,
            max: (!data.max || data.max === '') ? null : +data.max,
        })

        return {
            err: 0,
            mess: "Create area success!"
        }

    } catch (error) {
        console.log("Lỗi ở createArea: ", error);
        return {
            err: -999,
            mess: `Error server : ${error}`
        }
    }
}

const deleteArea = async (code) => {
    try {
        if (!code) {
            return {
                err: 1,
                mess: "Code is required !"
            }
        }

        const price = await db.Area.findOne({
            where: { code: code }
        })

        if (!price) {
            return {
                err: 2,
                mess: "Area is not exist"
            }
        }

        const post = await db.Post.findOne({
            where: { areaCode: code }
        }
        )

        if (post) {
            return {
                err: 3,
                mess: "Delete dosen't success because this area has posts"
            }
        }

        await db.Area.destroy({
            where: { code: code }
        })

        return {
            err: 0,
            mess: "Delete area success !"
        }

    } catch (error) {
        console.log("Lỗi ở delêtArea: ", error);
        return {
            err: -999,
            mess: `Error Server!! : ${error}`,
        }
    }
}

const updateArea = async (data) => {
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

        const area = await db.Area.findOne({
            where: { code: data.code }
        })

        if (!area) {
            return {
                err: 5,
                mess: "Area is not exist"
            }
        }

        await db.Area.update(
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
            mess: 'Update area success !'
        }

    } catch (error) {
        console.log("Lỗi ở updateArea: ", error);
        return {
            err: -999,
            mess: `Error Server!! : ${error}`,
        }
    }
}

module.exports = { getArea, createArea, deleteArea, updateArea }
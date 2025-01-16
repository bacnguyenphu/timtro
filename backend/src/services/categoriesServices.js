const db = require('../models/index')

const getAllCategories = async () => {
    try {
        const categories = await db.Category.findAll({
            attributes: ['value', 'header', 'subheader','code'],
        })

        if (categories) {
            return {
                err: 0,
                mess: "get categories Succcess!!",
                categories
            }
        }

        return {
            err: 1,
            mess: "get categories failes!!!",
            categories:[]
        }

    } catch (error) {
        console.log("Lỗi ở getAllCategories: ", error);
        return {
            err: -999,
            mess: "get categories failes!!",
            categories:[]
        }
    }
}

module.exports = { getAllCategories }

const { where } = require('sequelize')
const db = require('../models/index')

const getAllCategories = async () => {
    try {
        const categories = await db.Category.findAll({
            attributes: ['value', 'header', 'subheader', 'code'],
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
            categories: []
        }

    } catch (error) {
        console.log("Lỗi ở getAllCategories: ", error);
        return {
            err: -999,
            mess: "get categories failes!!",
            categories: []
        }
    }
}


const createCategory = async (data) => {
    try {
        if (!data.code || !data.header || !data.value || !data.subheader) {
            return {
                err: 1,
                mess: "Params are required"
            }
        }

        const cate = await db.Category.findOne({
            where: { value: data.value }
        })

        if (cate) {
            return {
                err: 2,
                mess: "Category was exist !"
            }
        }

        await db.Category.create(
            {
                code: data.code,
                value: data.value,
                header: data.header,
                subheader: data.subheader,
            }
        )

        return {
            err: 0,
            mess: 'Create category success !'
        }

    } catch (error) {
        console.log("Lỗi ở createCategory! ", error);
        return {
            err: -999,
            mess: `Error server: ${error}`
        }
    }
}

const updateCategory = async (data) => {
    try {
        if (!data.code) {
            return {
                err: 1,
                mess: "Code is required !"
            }
        }

        const cate = await db.Category.findOne({
            where: { code: data.code }
        })

        if (!cate) {
            return {
                err: 2,
                mess: "Category is not exists !"
            }
        }

        await db.Category.update(
            {
                value: data.value,
                header: data.header,
                subheader: data.subheader,
            },
            {
                where: {
                    code: data.code,
                },
            },
        )

        return {
            err: 0,
            mess: 'Update category success !'
        }

    } catch (error) {
        console.log("Lỗi ở updateCategory: ", error);
        return {
            err: -999,
            mess: `Error server: ${error}`
        }
    }
}

const deleteCategory = async (code) => {
    try {
        if (!code) {
            return {
                err: 1,
                mess: "Code is required !"
            }
        }

        const cate = await db.Category.findOne({
            where: { code: code }
        })

        if (!cate) {
            return {
                err: 2,
                mess: "Category is not exists !"
            }
        }

        const post = await db.Post.findOne({
            where: { categoryCode: code }
        }
        )

        if (post) {
            return {
                err: 3,
                mess: "Delete dosen't success because this category has posts"
            }
        }

        await db.Category.destroy({
            where: { code: code }
        })

        return {
            err: 0,
            mess: "Delete category success !"
        }

    } catch (error) {
        console.log("Lỗi ở deleteCategory: ", error);
        return {
            err: -999,
            mess: `Error server: ${error}`
        }
    }
}

module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory }

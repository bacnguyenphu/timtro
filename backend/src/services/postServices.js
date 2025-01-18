const db = require('../models/index')

const getPosts = async () => {
    try {
        const posts = await db.Post.findAll({
            attributes: ['id', 'title', 'stars', 'address', 'description'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
            ],

        })

        return {
            err: 0,
            mess: "Get posts success!",
            posts
        }
    } catch (error) {
        console.log("Lỗi ở getPost : ", error);
        return {
            err: -999,
            mess: "Error server!!",
            posts: []
        }
    }
}

const getPostsByPaginate = async (page, limit, category, price) => {
    try {
        let whereCondition = {}

        if (!page && !limit) {
            return {
                err: 1,
                mess: "Params are required!!",
                posts: [],
                totalPosts: 0
            }
        }

        if (category) {
            whereCondition.categoryCode = category
        }

        if (price) {
            whereCondition.priceCode = price
        }

        const { count, rows } = await db.Post.findAndCountAll({
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
            ],
            where: {
                ...whereCondition
            },

            offset: (page - 1) * limit,
            limit: limit,
        })

        return {
            err: 0,
            mess: "Get post succsesss!!",
            posts: rows,
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    } catch (error) {
        console.log("Lỗi ở getPostsByPaginate : ", error);
        return {
            err: -999,
            mess: "Error server!!",
            posts: [],
            totalPosts: 0
        }
    }
}

module.exports = { getPosts, getPostsByPaginate }
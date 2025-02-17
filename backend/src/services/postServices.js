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

const getPostsByPaginate = async (page, limit, category, price, area,isNewPost) => {
    try {
        let whereCondition = {}

        let test = false;

        console.log('check isNewPost>>>', isNewPost);
        
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

        if (area) {
            whereCondition.areaCode = area
        }

        const { count, rows } = await db.Post.findAndCountAll({
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode', 'areaCode','createdAt'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
                // { model: db.Category, as: 'category' }
            ],
            where: {
                ...whereCondition
            },

            order: isNewPost ?  [
                ['createdAt','DESC']
            ] : null,

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

const createPost = async(data)=>{
    
}

module.exports = { getPosts, getPostsByPaginate }
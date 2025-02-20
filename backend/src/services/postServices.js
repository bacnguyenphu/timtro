const { Where } = require('sequelize/lib/utils');
const db = require('../models/index')
const { v4: uuidv4 } = require('uuid');

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

const getPostsByPaginate = async (page, limit, category, price, area, isNewPost) => {
    try {
        let whereCondition = {}

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
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode', 'areaCode', 'createdAt'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
                // { model: db.Category, as: 'category' }
            ],
            where: {
                ...whereCondition
            },

            order: isNewPost ? [
                ['createdAt', 'DESC']
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

const createNewPost = async (data) => {
    const iditifyPrice = (value) => {
        let price = +value / 1000000.0
        if (price < 1) {
            return `${+value / 1000} nghìn/tháng`
        }
        else {
            return `${formatNumber(+value / 1000000.0)} triệu/tháng`
        }
    }

    const formatNumber=(num)=> {
        const fixedNum = num.toFixed(1); // Giữ 1 số sau dấu phẩy
        return fixedNum.endsWith(".0") ? Math.floor(num) : parseFloat(fixedNum);
    }

    try {
        const idPost = uuidv4()
        const attributesId = uuidv4()
        const imagesId = uuidv4()
        await db.Post.create({
            id: idPost,
            title: data?.title,
            address: data?.address,
            attributesId: attributesId,
            categoryCode: data?.categoryCode,
            description: data?.description,
            userId: data?.idUser,
            imagesId: imagesId,
            priceCode: data?.priceCode,
            areaCode: data?.areaCode,
            priceNumber: data?.price,
            areaNumber: data?.acreage,
            wardCode: data?.wardCode
        })

        await db.Attribute.create({
            id: attributesId,
            price: iditifyPrice(data?.price),
            acreage: `${data?.acreage}m2`
        })

        await db.Image.create({
            id: imagesId,
            images: data?.images
        })

        return {
            err: 0,
            mess: "Post success !",
        }

    } catch (error) {
        console.log("Lỗi ở createNewPost : ", error);
        return {
            err: -999,
            mess: "Error server!!",
        }
    }
}

const getPostsByIDUser = async(page,limit,idUser)=>{
    try {
        const { count, rows } = await db.Post.findAndCountAll({
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode', 'areaCode', 'createdAt'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
                // { model: db.Category, as: 'category' }
            ],
            where: {
                userId : idUser
            },

            // order: isNewPost ? [
            //     ['createdAt', 'DESC']
            // ] : null,

            offset: (page - 1) * limit,
            limit: limit,
        })

        return{
            err:0,
            mess:"Get post by iduser success!",
            posts : rows,
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    } catch (error) {
        console.log("Lỗi ở getPostByIDUser: ", error);
        return{
            err:-999,
            mess:"Error Server!",
            posts:[],
            totalPosts: 0,
            totalPages: 0,
            currentPage: page
        }
    }
}

module.exports = { getPosts, getPostsByPaginate, createNewPost,getPostsByIDUser }
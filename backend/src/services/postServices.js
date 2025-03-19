const db = require('../models/index')
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

const iditifyPrice = (value) => {
    let price = +value / 1000000.0
    if (price < 1) {
        return `${+value / 1000} nghìn/tháng`
    }
    else {
        return `${formatNumber(+value / 1000000.0)} triệu/tháng`
    }
}

const formatNumber = (num) => {
    const fixedNum = num.toFixed(1); // Giữ 1 số sau dấu phẩy
    return fixedNum.endsWith(".0") ? Math.floor(num) : parseFloat(fixedNum);
}

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

const getPostsByPaginate = async (page, limit, category, price, area, isNewPost, address) => {
    try {
        let whereCondition = {}
        console.log('check address1: ',address);
        

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

        if (address) {
            whereCondition.address = { [Op.like]: `%${address}%` }
        }

        const { count, rows } = await db.Post.findAndCountAll({
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode', 'areaCode', 'createdAt',],
            include: [
                { model: db.User, as: 'posts_like', through: { attributes: ['id_post', 'id_user'] } },
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['id', 'name', 'phone', 'avatar',] },
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
            mess: `Error server!! : ${error}`,
            posts: [],
            totalPosts: 0
        }
    }
}

const getPostByID = async (idPost) => {
    try {
        const post = await db.Post.findOne({
            where: { id: idPost },
            // attributes: ['id', 'title', 'stars', 'address', 'description'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published', 'id'], },
                { model: db.Image, as: 'images', attributes: ['images', 'id'] },
                { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar', 'zalo'] },
            ],
        })

        if (post === null) {
            return {
                err: 1,
                mess: "Post do not exist"
            }
        }

        return {
            err: 0,
            mess: "Get post is successful !",
            post
        }

    } catch (error) {
        console.log('Lỗi ở getPostByID: ', error);
        return {
            err: -999,
            mess: "Error Server!"
        }
    }
}

const createNewPost = async (data) => {
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

const getPostsByIDUser = async (page, limit, idUser) => {
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
                userId: idUser
            },

            order: [
                ['createdAt', 'DESC']
            ],

            offset: (page - 1) * limit,
            limit: limit,
        })

        return {
            err: 0,
            mess: "Get post by iduser success!",
            posts: rows,
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    } catch (error) {
        console.log("Lỗi ở getPostByIDUser: ", error);
        return {
            err: -999,
            mess: "Error Server!",
            posts: [],
            totalPosts: 0,
            totalPages: 0,
            currentPage: page
        }
    }
}

const deletePostByID = async (idPost) => {
    try {
        const post = await db.Post.findOne({
            where: { id: idPost },
            attributes: ['id'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['id'], },
                { model: db.Image, as: 'images', attributes: ['id'] },
            ],
        })

        if (post === null) {
            return {
                err: 1,
                mess: "Post do not exist"
            }
        }

        await db.Post.destroy({
            where: {
                id: idPost
            },
        });

        await db.Attribute.destroy({
            where: {
                id: post.attribute.id
            },
        });

        await db.Image.destroy({
            where: {
                id: post.images.id
            },
        });

        return {
            err: 0,
            mess: "Delete is success !"
        }

    } catch (error) {
        console.log('Lỗi ở deletePostByID: ', error);
        return {
            err: -999,
            mess: "Error Server!"
        }
    }
}

const updatePostByID = async (data) => {

    try {
        const post = await db.Post.findOne({
            where: { id: data.idPost },
            attributes: ['id'],
            include: [
                { model: db.Attribute, as: 'attribute', attributes: ['id'], },
                { model: db.Image, as: 'images', attributes: ['id'] },
            ],
        })

        if (post === null) {
            return {
                err: 1,
                mess: "Post do not exist"
            }
        }

        await db.Post.update(
            {
                title: data?.title,
                address: data?.address,
                categoryCode: data?.categoryCode,
                description: data?.description,
                priceCode: data?.priceCode,
                areaCode: data?.areaCode,
                priceNumber: data?.price,
                areaNumber: data?.acreage,
                wardCode: data?.wardCode
            },
            {
                where: {
                    id: data.idPost
                },
            },
        );

        await db.Attribute.update(
            {
                price: iditifyPrice(data?.price),
                acreage: `${data?.acreage}m2`
            },
            {
                where: {
                    id: post.attribute.id
                },
            },
        );

        await db.Image.update(
            {
                images: data?.images
            },
            {
                where: {
                    id: post.images.id
                },
            },
        );

        return {
            err: 0,
            mess: "Update is success !"
        }

    } catch (error) {
        console.log('Lỗi ở updatePostByID: ', error);
        return {
            err: -999,
            mess: "Error Server!"
        }
    }
}

const likeAndDislikePostByUser = async (idPost, idUser) => {
    try {
        if (!idPost) {
            return {
                err: 1,
                mess: `ID post is required`,
            }
        }

        if (!idUser) {
            return {
                err: 2,
                mess: `ID user is required`,
            }
        }

        const post = await db.Post.findOne({
            where: { id: idPost },
        })

        if (post === null) {
            return {
                err: 3,
                mess: "Post do not exist"
            }
        }

        const [Posts_like, created] = await db.Posts_like.findOrCreate({
            where: {
                [Op.and]: [{ id_user: idUser }, { id_post: idPost }],
            },
            defaults: {
                id_user: idUser,
                id_post: idPost,
            }
        })

        if (!created) {
            await db.Posts_like.destroy({
                where: {
                    [Op.and]: [{ id_user: idUser }, { id_post: idPost }],
                },
            });

            return {
                err: 0,
                mess: "Dislike succsess!!"
            }
        }

        return {
            err: 0,
            mess: `User id:${idUser} liked post id:${idPost} succsess!!`,
        }

    } catch (error) {
        console.log("Lỗi ở likeAndDislikePostByUser");
        return {
            err: -999,
            mess: `Error server!!: ${error}`,
        }
    }
}

const getPostLikedOfUser = async (idUser) => {
    try {

        if (!idUser) {
            return {
                err: 1,
                mess: `ID user is required`,
            }
        }

        const idPostIsLiked = await db.Posts_like.findAll({
            where: { id_user: idUser },
            attributes: ['id_post', 'createdAt']
        })

        return {
            err: 0,
            mess: `Get id posts is liked by user success!!`,
            data: idPostIsLiked
        }

    } catch (error) {
        console.log("Lỗi ở getPostLikeOfUser: ", error);
        return {
            err: -999,
            mess: `Error server!!: ${error}`
        }

    }
}

const getPostsLiked = async (listId, page, limit) => {
    try {
        if (!listId) {
            return {
                err: 1,
                mess: `listId is required!!`
            }
        }

        const { count, rows } = await db.Post.findAndCountAll({
            attributes: ['id', 'title', 'stars', 'address', 'description', 'categoryCode', 'priceCode', 'areaCode', 'createdAt',],
            include: [
                { model: db.User, as: 'posts_like', through: { attributes: ['id_post', 'id_user'] } },
                { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published'], },
                { model: db.Image, as: 'images', attributes: ['images'] },
                { model: db.User, as: 'user', attributes: ['id', 'name', 'phone', 'avatar',] },
                // { model: db.Category, as: 'category' }
            ],
            where: {
                id: { [Op.in]: JSON.parse(listId) } // Lấy tất cả user có ID trong danh sách này
            },
            order: [
                ['createdAt', 'DESC']
            ],

            offset: (page - 1) * limit,
            limit: limit,
        })

        return {
            err: 0,
            mess: "Get post liked success!",
            data: rows,
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    } catch (error) {
        console.log("Lỗi ở getPostLiked: ", error);
        return {
            err: -999,
            mess: `Error server!!: ${error}`
        }
    }
}

module.exports = {
    getPosts, getPostsByPaginate, createNewPost, getPostsByIDUser,
    deletePostByID, updatePostByID, getPostByID, likeAndDislikePostByUser,
    getPostLikedOfUser, getPostsLiked
}
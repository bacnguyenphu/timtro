const db = require('../models/index')
const bcrypt = require('bcrypt');

const hassPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
}

const getUsers = async (page, limit) => {
    try {
        if (!page) {
            return {
                err: 1,
                mess: 'Page index is required !'
            }
        }

        if (!limit) {
            return {
                err: 2,
                mess: 'Limit index is required !'
            }
        }

        const { count, rows } = await db.User.findAndCountAll({
            attributes: ['id', 'name', 'phone', 'zalo', 'avatar'],
            order: [
                ['createdAt', 'DESC']
            ],
            offset: (page - 1) * limit,
            limit: limit,
        })

        return {
            err: 0,
            mess: "Get users success!",
            data: rows,
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }

    } catch (error) {
        console.log("Lỗi ở getUsers");
        return {
            err: -999,
            mess: `Error server: ${error}`
        }
    }
}

const deleteUser = async (idUser) => {
    try {
        if (!idUser) {
            return {
                err: 1,
                mess: 'Id user is required! '
            }
        }

        const user = await db.User.findOne({
            where: { id: idUser }
        })

        if (!user) {
            return {
                err: 2,
                mess: 'User is not exist!'
            }
        }

        await db.User.destroy({
            where: { id: idUser }
        })

        return {
            err: 0,
            mess: 'Delete user success !'
        }

    } catch (error) {
        console.log("Lỗi ở deleteUser: ", error);
        return {
            err: -999,
            mess: `Error server: ${error}`
        }
    }
}

const resetPassUser = async (idUser) => {
    try {
        if (!idUser) {
            return {
                err: 1,
                mess: 'Id user is required !'
            }
        }

        const user = await db.User.findOne({
            where: { id: idUser }
        })

        if (!user) {
            return {
                err: 2,
                mess: 'User is not exist!'
            }
        }

        await db.User.update(
            { password: hassPassword('123456') },
            {
                where: {
                    id: idUser,
                },
            },
        );

        return {
            err: 0,
            mess: `Reset password account ${user.phone} success!`
        }

    } catch (error) {
        console.log('Lỗi ở resetPassUser: ', error);
        return {
            err: -999,
            mess: `Error server: ${error}`
        }

    }
}

module.exports = { getUsers, deleteUser, resetPassUser }
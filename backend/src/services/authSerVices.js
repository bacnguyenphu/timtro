const db = require('../models/index')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { createJWT } = require('../middleware/JWTaction')

const hassPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
}

const register = async (data) => {
    try {
        if (!data.name || !data.password || !data.phone) {
            return {
                err: 1,
                mess: "Params is required"
            }
        }
        
        const [user, created] = await db.User.findOrCreate({
            where: { phone: data.phone },
            defaults: {
                name: data.name,
                password: hassPassword(data.password),
                id: uuidv4()
            }
        })

        return {
            err: created ? 0 : 2,
            mess: created ? "Register success!" : "Phone has been used",
        }

    } catch (error) {
        console.log("Lỗi ở register : ", error);
        return {
            err: -999,
            mess: "Error server"
        }
    }
}

const login = async (data) => {
    try {

        if (!data.phone && !data.password) {
            return {
                err: 3,
                mess: "Params is required"
            }
        }
        let user = await db.User.findOne({
            where: { phone: data.phone }
        })
        if (!user) {
            return {
                err: 1,
                mess: "User is not exist"
            }
        }

        const checkPass = bcrypt.compareSync(data.password, user.password)
        if (!checkPass) {
            return {
                err: 2,
                mess: "Password is not correct"
            }
        }

        const token = createJWT({
            id: user.id,
            name: user.name,
            phone: user.phone,
            avatar: user.avatar,
            zalo: user.zalo,
            role: user.role,
        })

        return {
            err: 0,
            mess: "Login success",
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            zalo: user.zalo,
            token: token,
        }

    } catch (error) {
        console.log("Lỗi ở login : ", error);
        return {
            err: -999,
            mess: "Error server"
        }
    }
}

const getInfoUser = async (idUser) => {
    try {
        let user = await db.User.findOne(
            {
                attributes: ['id', 'name', 'phone', 'zalo', 'avatar'],
                where: { id: idUser },
            },
        )

        return {
            err: 0,
            user: user
        }

    } catch (error) {
        console.log("Lỗi ở getInfoUser: ", error);
        return {
            err: -999,
            mess: "Error server"
        }
    }
}

const updateUser = async (data) => {
    try {
        console.log("data>>", data);

        let user = await db.User.findOne({
            where: { id: data.id }
        })

        if (!user) {
            return {
                err: 1,
                mess: "User not exist!"
            }
        }

        if (data?.passwordCurrent) {
            const checkPass = bcrypt.compareSync(data.passwordCurrent, user.password)
            console.log('check pass>>>', checkPass);

            if (!checkPass) {
                return {
                    err: 2,
                    mess: "Password is not correct"
                }
            }
        }

        const dataUpdate = {}

        if (data?.passwordCurrent && data?.passwordNew) {
            dataUpdate.name = data.name
            dataUpdate.password = hassPassword(data.passwordNew)
            dataUpdate.phone = data.phone
            dataUpdate.zalo = data.zalo
            dataUpdate.avatar = data.avatar
        }
        else {
            dataUpdate.name = data.name
            dataUpdate.phone = data.phone
            dataUpdate.zalo = data.zalo
            dataUpdate.avatar = data.avatar
        }

        console.log('check dataupdate>>>', dataUpdate);


        await db.User.update(
            {
                ...dataUpdate
            },
            {
                where: {
                    id: data.id,
                },
            },
        );

        return {
            err: 0,
            mess: "Update success"
        }

    } catch (error) {
        console.log('Lỗi ở updateUser: ', error);
        return {
            err: -999,
            mess: `Error server : Lỗi ở updateUser : ${error}`
        }
    }
}

module.exports = { register, login, getInfoUser, updateUser }
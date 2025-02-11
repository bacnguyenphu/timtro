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
        if(!data.phone&&!data.password){
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
            name: user.name,
            phone: user.phone,
            avatar: user.avatar
        })

        return {
            err: 0,
            mess: "Login success",
            name: user.name,
            phone: user.phone,
            avatar: user.avatar,
            token: token
        }

    } catch (error) {
        console.log("Lỗi ở login : ", error);
        return {
            err: -999,
            mess: "Error server"
        }
    }
}

module.exports = { register, login }
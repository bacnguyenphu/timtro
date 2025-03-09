const auth = require('./auth')
const category = require('./category')
const post = require('./post')
const price = require('./price')
const area = require('./area')
const address = require('./address')
const user = require('./user')

const insert = require('./insert')

const initRoutes = (app) => {

    app.use('/api', auth)
    app.use('/api', category)
    app.use('/api', post)
    app.use('/api', price)
    app.use('/api', area)
    app.use('/api',address)
    app.use('/api',user)

    //insert data
    app.use('/api', insert)
   
    return app.use('/', (req, res) => {
        console.log("server on....");
        return res.send('trang chu')
    })
}

module.exports = initRoutes
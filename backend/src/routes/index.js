const auth = require('./auth')
const category = require('./category')
const post  = require('./post')

const insert = require('./insert')

const initRoutes = (app)=>{

    app.use('/api',auth)
    app.use('/api',category)
    app.use('/api',post)

    //insert data
    app.use('/api',insert)
    return app.use('/',(req,res)=>{
        console.log("server on....");
        return res.send('trang chu')
    })
}

module.exports = initRoutes
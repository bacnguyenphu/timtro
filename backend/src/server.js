const express = require('express')
require('dotenv').config()
var cors = require('cors')
const connection = require('./config/connectDB')
const initRoutes = require('./routes/index')

const port = process.env.PORT || 8083

const app = express()
app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connection()
initRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const user = require('../router/userRouter')
const room = require('../router/roomRouter')
const order = require('../router/orderRouter')
const food = require('../router/foodRouter')
const app = express()


const config = require('../config')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user',user)
app.use('/api/room',room)
app.use('/api/order',order)
app.use('/api/food',food)


module.exports = app
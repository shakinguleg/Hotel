const express = require('express')
const user = require('../router/userRouter')
const room = require('../router/roomRouter')
const order = require('../router/orderRouter')
const food = require('../router/foodRouter')
const banner = require('../router/bannerRouter')
const coupon = require('../router/couponRouter')
const app = express()


const config = require('../config')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user',user)
app.use('/api/room',room)
app.use('/api/order',order)
app.use('/api/food',food)
app.use('/api/banner',banner)
app.use('/api/coupon',coupon)

module.exports = app
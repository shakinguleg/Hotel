const {model,Schema} = require('mongoose')
module.exports = model('coupon',{
    title:{
        type:String,
        default:'万枫酒店优惠券'
    },
    price:{
        type:Number,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    },
    online:{
        type:Boolean,
        default:true
    },
    exchange :{
        type:Boolean,
        default:true
    },
    integral:{
        type:Number,
        required:true
    },
})
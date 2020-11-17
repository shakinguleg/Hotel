const {model,Schema} = require('mongoose')
module.exports = model('user',{
    openID:{
        type:String,
        required:true
    },
    nickName:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    integral:{
        type:Number,
        default:100
    },
    coupon:[{
        type:Schema.Types.ObjectId,
        ref: 'coupon'
    }],
    outTimeCoupon:[{
        type:Schema.Types.ObjectId,
        ref: 'coupon' 
    }],
    usedCoupon:[{
        type:Schema.Types.ObjectId,
        ref: 'coupon' 
    }],
    money:{
        type:Number,
        default:0
    },
    time:{
        type:String,
        required:true
    }
})
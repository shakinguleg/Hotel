const {model,Schema} = require('mongoose')
module.exports = model('recharge',{
    vip:{
        type:String,
        required:true
    },
    VIPCode:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    con:{
        type:String,
        required:true
    },

    gift:{
        type:Array,
        required:true 
    },
    price:{
        type:Number,
        required:true,
    },
    time:{
        type:Number,
        required:true
    }
})
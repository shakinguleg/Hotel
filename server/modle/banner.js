const {model,Schema} = require('mongoose')


module.exports = model('banner',{
    type:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})
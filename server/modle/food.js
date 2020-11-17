const {model,Schema} = require('mongoose')
module.exports = model('food',{
    tag:{
        type:Array,
        required:true
    },
 
    rate:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true 
    },
    time:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    }
})
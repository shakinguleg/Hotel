const {model,Schema} = require('mongoose')


module.exports = model('order',{
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'room'
    },
    state:{
        type:String,
        default:'0'
    },
    count:{
        type:Number,
        required:true 
    },
    start:{
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true 
    },
    message:{
        type:String
    },
    price:{
        type:Number,
        required:true 
    },
    end:{
        type:String,
        required:true 
    },
    time:{
        type:Number,
        required:true
    }
})
const {model,Schema} = require('mongoose')
module.exports = model('comment',{
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'room'
    },
    rate:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true 
    },
    time:{
        type:Number,
        required:true
    }
    
})
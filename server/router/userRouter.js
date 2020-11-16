const {Router} = require('express');
const User = require('../modle/user')
const router = new Router();
const {formatDate} = require('clq-util')
router.post('/register',async (req,res)=>{//注册
    const {openID} = req.body
    console.log('req.body: ', req.body);
    const result = await User.findOne({openID})
    if(result){
        res.json({
            code:-1,
            msg:'用户名重复'
        })
    }else{
        await User.create({...req.body,time:formatDate("Y-M-D H-M-S")})
        res.json({
            code:0,
            msg:'注册成功'
        })
    }
})

module.exports = router
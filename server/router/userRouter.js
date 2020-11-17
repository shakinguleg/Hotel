const {Router} = require('express');
const User = require('../modle/user')
const Coupon = require('../modle/coupon')
const router = new Router();
const {formatDate} = require('clq-util')
router.post('/register',async (req,res)=>{//注册
    const {openID} = req.body
    
    const result = await User.findOne({openID})
    if(result){
        res.json({
            code:-1,
            msg:'用户名重复'
        })
    }else{
    let newUser =  await User.create({...req.body,time:formatDate("Y-M-D H-M-S")})
        res.json({
            code:0,
            msg:'注册成功',
            data:newUser
        })
    }
})
router.get('/check',async (req,res)=> {
    const {openID} = req.query;
    const data = await User.findOne({openID})
    
    if(data){
        res.json({
            code:1,
            data
        })
    }else{
        res.json({
            code:0,
        })
    }
})
router.post('/getCoupon',async (req,res)=>{
    const {openID,couponId} = req.body
    await User.updateOne({openID},{$push:{coupon:couponId}}),
    res.json({
        code:1,
        mag:"ok"
    })
})
router.get('/allCoupon',async (req,res)=>{
    const {openID} = req.query
  let result =   await User.find({openID}).populate(['coupon']).populate('usedCoupon')
    res.json({
        code:1,
        data:result
    })
})
router.post('/useCoupon',async (req,res)=>{
    const {openID,couponId} = req.body
    
    
  await User.updateOne({openID},{$pull:{coupon:couponId}})
  await User.updateOne({openID},{$push:{usedCoupon:couponId}})
    res.json({
        code:1,
        msg:"ok"
    })
})
router.post("/recharge" , async (req,res)=>{
    const {count,openID} = req.body;
    const result = await User.find({openID})
    
    if(result){
        await User.updateOne({openID},{money:result[0].money + count*1})
        res.json({
            code:1,
            msg:"ok"
        })
    }else{
        res.json({
            code:0,
            msg:"充值失败"
        }) 
    }
})
router.get("/userInfo" , async (req,res)=>{
    const {openID} = req.query;
    
    // 
    const result = await User.find({openID})
        res.json({
            code:1,
            data:result
        })
    
})
module.exports = router
const {Router} = require('express');
const User = require('../modle/user')
const Coupon = require('../modle/coupon')
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
    console.log('openID: ', openID);
    console.log('couponId: ', couponId);
  await User.updateOne({openID},{$pull:{coupon:couponId}})
  await User.updateOne({openID},{$push:{usedCoupon:couponId}})
    res.json({
        code:1,
        msg:"ok"
    })
})
module.exports = router
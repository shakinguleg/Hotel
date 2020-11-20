const {Router} = require('express');
const User = require('../modle/user')
const Coupon = require('../modle/coupon')
const router = new Router();
const {formatDate} = require('clq-util')
function toggleVip(user){
    user.money = user.money.toFixed(2)*1
    switch (user.VIPCode) {
        case 0:
            user.vip = "普通会员"
            break;
        case 1:
            user.vip = "青铜会员"
            break;
        case 2:
            user.vip = "白银会员"
            break;
        case 3:
            user.vip = "黄金会员"
            break;
        default:
            user.vip = "普通会员"
            break;
    }
}
// function toggleOrderDate(str){
//     let _str = str.slice(0,-1),
//     return _str.split('月')
// }
// function countNight(start ,end){
//     start = toggleOrderDate(start)
//     end = toggleOrderDate(end)

// }
router.post('/register',async (req,res)=>{//注册
    const {openID} = req.body
    
    const result = await User.findOne({openID})
    if(result){
        res.json({
            code:-1,
            msg:'用户名重复'
        })
    }else{
    let newUser =  await User.create({...req.body,time:formatDate("Y-M-D H-M-S")}).lean()
    toggleVip(newUser)
        res.json({
            code:0,
            msg:'注册成功',
            data:newUser
        })
    }
})
router.get('/check',async (req,res)=> {
    const {openID} = req.query;
    const data = await User.findOne({openID}).lean()
    toggleVip(data)

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
   let res2 =  await User.updateOne({openID},{$push:{coupon:couponId}});
   
    res.json({
        code:1,
        mag:"ok"
    })
})
router.get('/allCoupon',async (req,res)=>{
    const {openID} = req.query
  let result =   await User.find({openID},{coupon:true,usedCoupon:true}).populate(['coupon']).populate('usedCoupon')
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
router.post('/pay',async (req,res)=>{
    const {user,price} = req.body
        let {money,integral} = await User.findById(user)
       
       data = await  User.findByIdAndUpdate(user,{money:(money-(price*1).toFixed(2)*1),integral:integral + parseInt((price*1)/10)},{new:true}).lean()
      toggleVip(data)
    //   data.money = data.money.toFixed(2)*1
    //   
    res.json({
        code:1,
        msg:"ok",
        data
    })
})
router.post("/recharge" , async (req,res)=>{
    let {count,openID,VIPCode} = req.body;
    VIPCode = parseInt(VIPCode)
    
    const result = await User.findOne({openID})
    
    
    User.findOneAndUpdate
    if(result){
        if(VIPCode > result.VIPCode){
            let newRes =   await User.findOneAndUpdate({openID},{money:result.money + count*1,VIPCode:VIPCode*1},{new:true}).lean()
            toggleVip(newRes)
        res.json({
            code:1,
            msg:"ok",
            data:newRes
        })
        }else{
            
         let newRes =    await User.findOneAndUpdate({openID},{money:result.money + count*1},{new:true}).lean()
        //  
         toggleVip(newRes)
        res.json({
            code:1,
            msg:"ok",
            data:newRes
        })
        }
        
      
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
router.post('/signIn',async (req,res)=>{
    const {user,date} = req.body
    let {integral,signIn} = await User.findById(user)
    
    
   let data =  await User.findByIdAndUpdate(user,{$push:{signIn:date},integral:integral + (signIn.length%7)*5+10},{new:true})
    res.json({
        code:1,
        mag:"ok",
        data
    })
})
router.post('/canExchangeCoupon',async (req,res)=>{
    const {user} = req.body
    let {coupon,usedCoupon}  = await User.findById(user).lean()
    let arr  = [...coupon,...usedCoupon] 
    let data = await Coupon.find().lean()
    data.forEach(item => {
        arr.forEach(cou => {
            if(item._id.toString() == cou){
                item.exchange = false
            }
        })
    })
    res.json({
        code:1,
    msg:'ok',
    data
    })
})
router.post('/exchange',async (req,res)=>{
    const {user,integral} = req.body
    let oldIntegral = await User.findById(user)
    const data = await  User.findByIdAndUpdate(user,{integral:oldIntegral.integral -(integral*1)},{new:true})
    res.json({
        code:1,
        msg:'ok',
        data
    })
})
module.exports = router
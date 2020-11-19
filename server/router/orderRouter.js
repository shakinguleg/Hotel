const { Router } = require("express");
const Order = require("../modle/order");
const User = require("../modle/user");
const router = new Router();
const { formatDate } = require("clq-util");
const user = require("../modle/user");
function toggleVip(user){
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
router.get("/allOrder",async (req,res)=>{
    const {user} = req.query
    const result = await Order.find({user}).populate('room');
    res.json({
        code:1,
        data:result
    })
})
router.post('/addOrder',async (req,res)=>{
  const {state,user} = req.body
  await  Order.create({
      user:user,
      room:req.body.room,
      count:req.body.count*1,
      start:req.body.start,
      name:req.body.name,
      phone:req.body.phone*1,
      message:req.body.message,
      price:req.body.price*1,
      end:req.body.end,
      state:state,
      time:Date.now()
  })
  res.json({
      code:1,
      msg:"ok",
  })
})
router.post('/updateState',async (req,res)=>{
    const {orderId,state,user} = req.body
    await  Order.findByIdAndUpdate(orderId,{state:state})
    res.json({
        code:1,
        msg:'ok',
    })
  })
module.exports = router;

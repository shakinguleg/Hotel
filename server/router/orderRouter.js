const { Router } = require("express");
const Order = require("../modle/order");
const router = new Router();
const { formatDate } = require("clq-util");
router.get("/allOrder",async (req,res)=>{
    const {user} = req.query
    const result = await Order.find({user}).populate('room');
    res.json({
        code:1,
        data:result
    })
})
router.post('/addOrder',async (req,res)=>{
  await  Order.create({
      user:req.body.user,
      room:req.body.room,
      count:req.body.count*1,
      start:req.body.start,
      name:req.body.name,
      phone:req.body.phone*1,
      message:req.body.message,
      price:req.body.price*1,
      end:req.body.end,
      time:Date.now()
  })
  res.json({
      code:1,
      msg:"ok"
  })
})
router.post('/updateState',async (req,res)=>{
    const {orderId,state} = req.body
    

  const data =   await  Order.findByIdAndUpdate(orderId,{state:state})
    res.json({
        code:1,
        msg:'ok'
    })
  })
module.exports = router;

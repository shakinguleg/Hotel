const { Router } = require("express");
const Coupon = require("../modle/coupon");
const router = new Router();
const { formatDate } = require("clq-util");
router.post("/add", async (req, res) => {
  //注册
  const {limit,price,start,end}  = req.body
  console.log('req.body: ', req.body);
  await Coupon.create({
    time: Date.now(),
    limit,
    price,
    start,
    end,

  });
  res.json({
    code: 0,
    msg: "注册成功",
  });
});
router.get("/allCoupon",async (req,res)=>{
    let online = !!req.query.online || ''
    let result
    if(online){
        result  = await Coupon.find({online});
    }else{
        result  = await Coupon.find();
    }
     
    res.json({
        code:1,
        data:result
    })
})

module.exports = router;

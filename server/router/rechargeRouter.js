const { Router } = require("express");
const Recharge = require("../modle/recharge");
const router = new Router();
const { formatDate } = require("clq-util");
router.post("/add", async (req, res) => {
  //注册
  const {vip,price,con,color,gift,VIPCode}  = req.body
 
  await Recharge.create({
    vip,
    con,
    gift,
    time:Date.now(),
    price,
    color,
    VIPCode
  });
  res.json({
    code: 0,
    msg: "注册成功",
  });
});
router.get("/allRecharge",async (req,res)=>{
    const result = await Recharge.find().lean();

    res.json({
        code:1,
        data:result
    })
})

module.exports = router;

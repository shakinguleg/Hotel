const { Router } = require("express");
const Banner = require("../modle/banner");
const router = new Router();
const { formatDate } = require("clq-util");
router.post("/add", async (req, res) => {
  //注册
  const {type,image}  = req.body
  await Banner.create({
    type,
    image,
    time:Date.now()
  });
  res.json({
    code: 0,
    msg: "注册成功",
  });
});
router.get("/banner",async (req,res)=>{
    const {type} =req.query
    const result = await Banner.find({type});
    res.json({
        code:1,
        data:result
    })
})

module.exports = router;

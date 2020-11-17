const { Router } = require("express");
const Food = require("../modle/food");
const router = new Router();
const { formatDate } = require("clq-util");
router.post("/add", async (req, res) => {
  //注册
  const {cover,price,title}  = req.body
  console.log('req.body: ', req.body);
  await Food.create({
    tag: ["海鲜", "粤菜", "湘菜"],
    rate:5.0,
    time: formatDate("Y-M-D H-M-S"),
    cover,
    price,
    title
  });
  res.json({
    code: 0,
    msg: "注册成功",
  });
});
router.get("/allFood",async (req,res)=>{
    const result = await Food.find();
    res.json({
        code:1,
        data:result
    })
})

module.exports = router;

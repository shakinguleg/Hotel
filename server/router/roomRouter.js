const { Router } = require("express");
const Room = require("../modle/room");
const Comment = require("../modle/comment");
const router = new Router();
const { formatDate } = require("clq-util");
router.post("/add", async (req, res) => {
  //注册
  const {cover,image,price,title}  = req.body
  
  await Room.create({
    tag: ["舒适", "全景阳台", "温泉"],
    info:[
        ["房间面积","65平方米"],
        ["床型","1.8m x 2m"],
        ["可住人数","2人"],
        ["能否加床","不可加床"],
        ["是否含早餐","含两位"],
    ],
    rate:5.0,
    time: formatDate("Y-M-D H-M-S"),
    cover,
    image,
    price,
    title
  });
  res.json({
    code: 0,
    msg: "注册成功",
  });
});
router.get("/allRoom",async (req,res)=>{
    const result = await Room.find();
    res.json({
        code:1,
        data:result
    })
})
router.post('/comment',async (req,res)=>{
  await  Comment.create({...req.body,time:Date.now()})
  res.json({
      code:1,
      msg:"ok"
  })
})
router.get('/roomComment',async (req,res)=>{
    const {roomId} = req.query
    
  const data =   await  Comment.find({room:roomId}).populate('user')
    res.json({
        code:1,
        data
    })
  })
module.exports = router;

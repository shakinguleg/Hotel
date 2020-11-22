Page({
  data: {
    bannerData:[],
    tabs:[{
      title:"客房预定",
      havePicker:true
    },
    {
      title:"餐饮预定",
      havePicker:false
    }],
    path:'',
    roomData:[],

  },

  onLoad: function (options) {
    this.setData({path:getApp().data.path});
    // 请求banner数据
    wx.request({
      url:this.data.path +  'api/banner/banner?type=roomDetail',
      success:(res)=>{
        this.setData({bannerData:res.data.data[0].image});
      }
    });
    // 请求客房数据
    wx.request({
      url: `${this.data.path}api/room/allRoom`,
      success:(res)=>{
        this.setData({roomData:res.data.data})
      }
    })
  },
})
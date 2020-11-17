Page({
  data: {
    bannerData:'',
    tabs:[]
  },

  onLoad: function (options) {
    wx.request({
      url: 'http://10.36.150.18:3000/api/banner/banner?type=roomDetail',
      success:(res)=>{
        this.setData({bannerData:res.data.data[0].image});
      }
    });
    const tabs = [
      {
        title:"客房预定",
        havePicker:true
      },
      {
        title:"餐饮预定",
        havePicker:false
      }
    ];
    this.setData({tabs:tabs});
  },
})
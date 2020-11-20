// app/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    server:[{
      con:'行李托管',
      src:'../../images/luggage.png'
    },
    {
      con:'休闲娱乐',
      src:'../../images/relaxation.png'
    },
    {
      con:'游泳池',
      src:'../../images/pool.png'
    },
    {
      con:'餐饮服务',
      src:'../../images/repast.png'
    },
    {
      con:'保险柜',
      src:'../../images/safe.png'
    },
    {
      con:'酒店WiFi',
      src:'../../images/wifi.png'
    },
    {
      con:'浴缸',
      src:'../../images/bathtub.png'
    },
    {
      con:'吹风机',
      src:'../../images/hair.png'
    },
  ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log();
          this.setData({
            room:JSON.parse(options.roomInfo),
            path:getApp().data.path
          })
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
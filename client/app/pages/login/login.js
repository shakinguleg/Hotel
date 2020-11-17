// miniprogram/page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  loginAction(...rest){
    wx.getUserInfo({
      lang: 'zh_CN',
    }).then(result =>{
      
      if(getApp().data.code){
        wx.switchTab({
          url: '../home/home',
        })
      }else{
        wx.request({
          url: getApp().data.path + "api/user/register",
          method:"POST",
          data:{
            openID:getApp().data.openID,
            nickName:result.userInfo.nickName,
            avatarUrl:result.userInfo.avatarUrl,
            gender:result.userInfo.gender
          },
          dataType:"json",
          success:(res3)=>{
            getApp().data.user = res3.data.data
            wx.switchTab({
              url: '../home/home',
            })
          }
        })
      }
      
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   

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
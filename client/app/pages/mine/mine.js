// app/pages/mine/mine.js
import SetUser from '../../plugin/setUser'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },
  // setUser(user){
  //   this.setData({
  //     user:user
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function (options) {
    this.setData({
      user: getApp().data.user
    })
=======
  onLoad: function (options) { 
  SetUser.apply(this)
>>>>>>> dd777b4c3435f720fb79a2c853740889ef52fa1f
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
<<<<<<< HEAD
    this.setData({
      user: getApp().data.user
    })
=======
 
>>>>>>> dd777b4c3435f720fb79a2c853740889ef52fa1f
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
      SetUser = null
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
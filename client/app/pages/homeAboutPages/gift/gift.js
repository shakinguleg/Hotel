// app/pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      data: {
        path
      }
    } = getApp()

    // console.log(getApp());


    wx.request({
      url: path + "api/recharge/allRecharge",
      success: ({
        data
      }) => {
        // 专享礼包界面接受的数据,当前只展示了以下字段, 后续价格字段可以添加
        // console.log(data);
        if (data.code === 1) {
          const arr = data.data.map(item => ({
            backgroundColor: item.color,
            member: item.vip,
            money: item.con,
            item1: item.gift[0] + "、" + item.gift[1],
            item2: item.gift[2],
            VIPCode: item.VIPCode,
            count: item.price
          }))
          this.setData({
            rechargeDataList: arr
          })
        }

      }
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
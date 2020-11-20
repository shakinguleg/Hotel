// app/pages/gift/gift.js
import SetUser from "../../../plugin/setUser"
import pubsub from "../../../plugin/pubsub"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeDataList: [],
    totalMoney: 0
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
    
    // 设置余额
    this.id = SetUser.call(this, (user) => {
      this.setData({
        totalMoney: user.money + ".00"
      })
    })

    // 展示充值礼包
    wx.request({
      url: path + "api/recharge/allRecharge",
      success: ({
        data
      }) => {
        // 专享礼包界面接受的数据,当前只展示了以下字段, 后续字段可以添加
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
          // 设置礼包数据
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
    pubsub.unSubscribe("user", this.id)
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
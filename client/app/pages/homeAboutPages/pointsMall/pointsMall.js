// app/pages/pointsMall/pointsMall.js
import setUser from "../../../plugin/setUser"
import pubsub from "../../../plugin/pubsub"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    pointsListData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 监听登录信息
    this.id = setUser.call(this, (user) => {
      const {
        integral,
        _id
      } = user;

      const {
        data: {
          path
        }
      } = getApp()
      this.setData({
        integral
      })
      // 获取兑换优惠券
      wx.request({
        url: path + "api/user/canExchangeCoupon",
        method: "POST",
        data: {
          user: _id
        },
        success: ({
          data: {
            code,
            data
          }
        }) => {
          if (code === 1) {
            const listData = data.map(item => ({
              price: item.price,
              limit: item.limit,
              start: item.start,
              end: item.end,
              exchange: item.exchange,
              integral: item.integral,
              id: item._id
            }))
            this.setData({
              pointsListData: listData
            })
          }
        },
        fail: (res) => {}
      })

    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
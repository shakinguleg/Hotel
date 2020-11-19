// components/rechargeItem/rechargeItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rechargeData: {
      type: Object,
      value: {
        backgroundColor: "#89C53F",
        member: "普通会员",
        money: "充值1000元, 送200元红包",
        item1: "50元美甲券, 100元美发券x3",
        item2: "200元美睫券x2"
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    rechargeAction(ev) {
      const {
        data: {
          path,
          openID
        }
      } = getApp()
      const count = ev.currentTarget.dataset.count
      const vip = ev.currentTarget.dataset.vip
      wx.request({
        url: path + "api/user/recharge",
        method: "POST",
        data: {
          openID,
          count,
          VIPCode: vip
        },
        success: (ev) => {
          // 点击充值结果
          if (ev.data.code === 1) {
            getApp().setUser(ev.data.data)
          }
        }
      })
    }
  }
})
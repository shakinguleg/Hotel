Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pointsItemData: {
      type: Object,
      value: {
        price: 0,
        limit: 0,
        start: "",
        end: "",
        exchange: false,
        integral: 0,
        id: ""
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
    tapAction() {
      // 点击兑换事件
      const {
        data: {
          path,
          user: {
            integral
          }
        }
      } = getApp()

      // 当用户剩余积分小于兑换所需积分
      if (integral < this.data.pointsItemData.integral) {
        return
      }

      // 已兑换状态
      if (this.data.pointsItemData.exchange === false) {
        return
      }

      // 可以兑换
      // 领取优惠券
      wx.request({
        url: getApp().data.path + "api/user/getCoupon",
        method: "POST",
        data: {
          openID: getApp().data.user.openID,
          couponId: this.data.pointsItemData.id
        },
        success: (res) => {
          // 领取优惠券成功
          if (res.data.code) {
            this.setData({
              exchange: false
            })
            // 消耗积分
            wx.request({
              url: getApp().data.path + "api/user/exchange",
              method: "POST",
              data: {
                user: getApp().data.user._id,
                integral: this.data.pointsItemData.integral
              },
              success: (res) => {
                if (res.data.code === 1)
                  // 更新user数据
                  getApp().setUser(res.data.data)
              }
            })
          }
        }
      })
    }
  },
})
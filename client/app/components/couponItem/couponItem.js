// components/couponItem/couponItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponItemData: {
      type: Object,
      value: {
        id: "",
        title: "万枫酒店优惠券",
        price: 50,
        limit: 150,
        content: "满299元减50元",
        startTime: "2015.11.10 00:00",
        endTime: "2015.12.10 00:00",
        couponType: 3, //1未使用,2已使用, 3已过期
      }
    },
    toPath: { //前往路径
      type: String,
      value: ""
    },
    orderPrice: { //下单金额
      type: Number,
      value: 10000000000000000000000000000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: "120rpx",
    backcolor: ["#FF2150", "#6AB759", "#999999"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // item点击事件
    tapAction(ev) {
      const {
        couponType,
        id,
        price,
        limit,
        content,
        title
      } = this.data.couponItemData
      // 当路径为空时,展示优惠券详情弹窗
      if (!this.data.toPath) {
        console.log("未设置路径, 展示优惠券详情弹窗");
        return
      }

      // 当从客房预订界面选择优惠券时
      if (this.data.toPath === "../../../pages/reserve_room/reserve_room") {
        // 当选择优惠券使用时, 选择类型为 未使用(1) 才可
        if (couponType === 1) {
          // 当订单金额大于优惠券使用价格
          if (this.data.orderPrice > limit) {
            getApp().data.coupon = {
              ...getApp().data.coupon,
              id,
              price,
              content,
              title
            }
            // wx.navigateTo({
            //   url: this.data.toPath,
            // })

            // 直接回退, 保持客房预订界面数据不丢失
            wx.navigateBack({
              delta: 1,
            })
          }

        }
        return;
      }
    }
  },
})
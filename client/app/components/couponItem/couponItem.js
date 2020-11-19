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
        content: "满299元减50元",
        startTime: "2015.11.10 00:00",
        endTime: "2015.12.10 00:00",
        couponType: 3, //1未使用,2已使用, 3已过期
      }
    },
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
    tapAction(ev) {
      const {
        couponType,
        id,
        price,
        content,
        title
      } = this.data.couponItemData
      // 当选择优惠券使用时, 选择类型为未使用才可
      if (couponType === 1) {
        // console.log("111");
        getApp().data.coupon = this.data.couponItemData
      }
    }
  },
})
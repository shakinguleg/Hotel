// app/pages/homeAboutPages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: '全部',
        data: []
      },
      {
        title: '未使用',
        data: []
      },
      {
        title: '已使用',
        data: []
      },
      {
        title: '已过期',
        data: []
      },
    ],
    activeIndex: 0,
    toPath: "",
    orderPrice: 1000000000000000000000000000000000000000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options && this.setData({
      orderPrice: options.price
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
    const {
      data: {
        openID,
        path
      }
    } = getApp()

    openID &&
      wx.request({
        // 获取优惠券信息
        url: path + "api/user/allCoupon",
        method: "GET",
        data: {
          openID
        },
        success: (res) => {
          const {
            coupon,
            usedCoupon
          } = res.data.data[0]
          // console.log(coupon, usedCoupon);

          // 设置券的类型
          const setCouponTypeArr = coupon.map(item => ({
            id: item._id,
            title: item.title,
            price: item.price,
            limit: item.limit,
            content: `满${item.limit}减${item.price}元`,
            startTime: item.start,
            endTime: item.end,
            couponType: Date.now() < Date.parse(item.end) ? 1 : 3,
          }))

          // 类型为 已使用 优惠券
          const newUsedCoupon = usedCoupon.map(item => ({
            id: item._id,
            title: item.title,
            price: item.price,
            limit: item.limit,
            content: `满${item.limit}减${item.price}元`,
            startTime: item.start,
            endTime: item.end,
            couponType: 2,
          }))

          // 过滤数据
          // 全部优惠券
          const allCoupon = [...setCouponTypeArr, ...newUsedCoupon];
          // 未使用优惠券
          const noUsedCoupon = setCouponTypeArr.filter(item => item.couponType === 1)
          // 已过期优惠券
          const timeoutCoupon = setCouponTypeArr.filter(item => item.couponType === 3)
          const arr = [{
              title: '全部',
              data: allCoupon
            },
            {
              title: '未使用',
              data: noUsedCoupon
            },
            {
              title: '已使用',
              data: newUsedCoupon
            },
            {
              title: '已过期',
              data: timeoutCoupon
            },
          ]

          // 设置coupon数据
          this.setData({
            tabs: arr
          })
        }
      })

    // 判断打开优惠券的界面
    const deepPath = getCurrentPages()
    const {
      route
    } = deepPath[deepPath.length - 2]
    const arr = route.split("/")
    const fromPath = arr[arr.length - 1]
    if (fromPath === "reserve_room") {
      // 如果是从预订界面
      // 设置前往路径为预订界面
      this.setData({
        activeIndex: 1,
        toPath: "../../../pages/reserve_room/reserve_room"
      })

    }
    if (fromPath === "home") {
      // 如果是从首页
    }
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
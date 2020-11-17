// app/pages/order/order.js
Page({

  data: {
    tabs:[]
  },

  onLoad: function (options) {
    const tabs = [
      {
        title:"全部",
        status:0,
      },
      {
        title:"待付款",
        status:1,
      },
      {
        title:"已完成",
        status:2,
      },
      {
        title:"已取消",
        status:3,
      }
    ]
    this.setData({tabs:tabs})
  },
})
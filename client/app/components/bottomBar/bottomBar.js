// components/bottomBar/bottomBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/home.png",
        "unSelectedIconPath": "/images/home.png",
        "selectedIconPath": "/images/home-s.png"
      },
      {
        "pagePath": "/pages/reserve/reserve",
        "text": "预定",
        "selectedIconPath": "../../images/reserve-s.png",
        "unSelectedIconPath": "../../images/reserve.png",
        "iconPath": "../../images/reserve.png"
      },
      {
        "pagePath": "/pages/order/order",
        "text": "订单",
        "selectedIconPath": "../../images/order-s.png",
        "unSelectedIconPath": "../../images/order.png",
        "iconPath": "../../images/order.png"
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "个人中心",
        "selectedIconPath": "../../images/mine-s.png",
        "unSelectedIconPath": "../../images/mine.png",
        "iconPath": "../../images/mine.png"
      }
    ],
    currentPath: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goAction(ev) {
      // console.log(ev);
      wx.switchTab({
        url: ev.currentTarget.dataset.godata,
      })
    }
  },
  lifetimes: {},
  pageLifetimes: {
    show() {
      const route = getCurrentPages()
      this.setData({
        ...this.data,
        currentPath: "/" + route[0].route
      })
      // console.log(this.data.currentPath);

      const newArr = this.data.list.map((item, index) => {
        // console.log(item.pagePath);

        if (item.pagePath === this.data.currentPath) {
          return {
            "pagePath": item.pagePath,
            "text": item.text,
            "iconPath": item.selectedIconPath,
            "selectedIconPath": item.selectedIconPath,
            "unSelectedIconPath": item.unSelectedIconPath
          }
        } else {
          return {
            "pagePath": item.pagePath,
            "text": item.text,
            "iconPath": item.unSelectedIconPath,
            "selectedIconPath": item.selectedIconPath,
            "unSelectedIconPath": item.unSelectedIconPath
          }
        }
      });
      // console.log(newArr);
      this.setData({
        ...this.data,
        list: newArr
      })

    }
  }
})
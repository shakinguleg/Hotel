// components/scroll/scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollItem: "item3",
    openAnimate: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollAction: (ev) => {

    }
  },
  lifetimes: {
    attached() {
      var i = 3
      setInterval(() => {
        //如果到达最后一张移动到第一组
        if (i >= this.data.scrollData.length - 3) {
          // 控制关闭动画效果
          this.setData({
            openAnimate: false,
            scrollItem: "item3"
          })
          i = 3
        }
        // 如果是第一张移动到最后一组
        if (i <= 2) {
          this.setData({
            openAnimate: false,
            scrollItem: "item" + this.data.scrollData.length + 2
          })
          i = this.data.scrollData.length + 2
        } else {
          // 控制开启动画效果
          this.setData({
            openAnimate: true,
            scrollItem: "item" + i
          })
        }
        i++;
      }, 1000)
    }
  },
  observers: {
    scrollData: (newVal, oldVal) => {
      console.log(newVal);

    }
  }
})
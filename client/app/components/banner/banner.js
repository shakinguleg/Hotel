// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circular: { //是否循环
      type: Boolean,
      value: false
    },
    autoplay: { //自动播放
      type: Boolean,
      value: false
    },
    interval: { //切换间隔
      type: Number,
      value: 3000
    },
    duration: { //动画时间
      type: Number,
      value: 1000,
    },
    swiperData: { //数据
      type: Array,
      value: []
    },
    easing: { //动画方式
      type: String,
      value: "easeInOutCubic"
    },
    width: {
      type: String,
      value: "100%"
    },
    height: {
      type: String,
      value: "134px"
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
  methods: {},
  observers: {
    swiperData: (newVal, oldVal) => {
      // console.log("newVal: " + JSON.stringify(newVal));
    }
  }

})
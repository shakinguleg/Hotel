// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circular: {
      type: Boolean,
      value: false
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    interval: {
      type: Number,
      value: 2000
    },
    duration: {
      type: Number,
      value: 1000,
    },
    swiperData: {
      type: Array,
      value: []
    },
    "easing-function": {
      type: String,

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

  }
})
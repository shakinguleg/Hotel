// app/pages/home/home.js
import SetUser from '../../plugin/setUser'
import formatDate from '../../plugin/formatDate'
const BASE_URL = "http://eveal.cn:3030/"
const BANNER_URL = "http://eveal.cn:3030/api/banner/banner?type=home";
const CENTER_SWIPER_URL = "http://eveal.cn:3030/api/room/allRoom"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top_banner_data: [],
    aboutData: [{
      imgPath: "../../images/shoutibao.png",
      text: "专享礼包",
      goPath: "../homeAboutPages/gift/gift"
    }, {
      imgPath: "../../images/meiriqiandao.png",
      text: "每日签到",
      goPath: "dailySign"
    }, {
      imgPath: "../../images/youhuiquan.png",
      text: "优惠券",
      goPath: "../homeAboutPages/coupon/coupon"
    }, {
      imgPath: "../../images/wodedingdan.png",
      text: "我的订单",
      goPath: "myOrder"
    }, {
      imgPath: "../../images/shangchengdingdan.png",
      text: "积分商城",
      goPath: "../homeAboutPages/pointsMall/pointsMall"
    }],
    center_banner_data: [],
    // 今日推荐房间数据

    roomData:[],
    path:'',
    showModel:true,
    signIn:[],
    canSignIn:false
  },

  // 相关入口点击事件
  goAction(ev) {
    // 如果路径为签到页面
    if (ev.currentTarget.dataset.action === "dailySign") {
      this.setData({
        showModel: true
      })
      return
    }
    // 如果路径为订单页面
    if (ev.currentTarget.dataset.action === "myOrder") {
      wx.switchTab({
        url: '/pages/order/order',
      })
      return
    }
    wx.navigateTo({
      url: ev.currentTarget.dataset.action,
    })
    // console.log(ev);
  },
  closeSignIn() {
    this.setData({
      showModel: false
    })
  },
  actionSignIn(){
    if(!this.data.canSignIn){
      return
    }else{
      wx.request({
        url:getApp().data.path + 'api/user/signIn',
        method:'POST',
        data:{
          user:getApp().data.user._id,
          date:Date.now()
        },
        success:(res)=>{
          getApp().setUser(res.data.data)
        }
      })
    }
  },
  onLoad: function (options) {
    //实时获取用户数据
    SetUser.call(this,(user)=>{
      let today = formatDate("Y-M-D")
      
        this.setData({
          signIn:user.signIn.map(item => formatDate("Y-M-D",(item*1))),
        })
        this.setData({
          canSignIn:!this.data.signIn.includes(today)
        })
    })
    // 获取banner图地址
    wx.request({
      url: BANNER_URL,
      success: ({
        data
      }) => {
        if (data.code === 1) {
          const arr = []
          const imgArr = data.data[0].image
          imgArr.forEach(item => {
            arr.push({
              imgPath: BASE_URL + item
            })
          })
          this.setData({
            ...this.data,
            top_banner_data: [...this.data.top_banner_data, ...arr]
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    });
    wx.request({
      url: CENTER_SWIPER_URL,
      success: ({
        data
      }) => {
        // console.log(data);
        if (data.code === 1) {
          const arr = []

          data.data.forEach(item => {
            arr.push({
              id: item.id,
              imgPath: BASE_URL + item.cover,
              price: "￥" + item.price,
              title: item.title
            })
          })
          arr.unshift(arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1])
          arr.push(arr[3], arr[4], arr[5])

          this.setData({
            ...this.data,
            center_banner_data: [
              ...this.data.center_banner_data,
              ...arr
            ]
          })
        }

      }
    })
    // 请求首页今日推荐房间数据
    const App = getApp();

    this.setData({
      path: App.data.path
    });
    wx.request({
      url: App.data.path + 'api/room/allRoom',
      success: (res) => {
        this.setData({
          roomData: res.data.data
        });
      }
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
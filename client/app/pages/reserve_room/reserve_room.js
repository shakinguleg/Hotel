// app/pages/reserve_room/reserve_room.js
Page({
  reduceAction() {
    if (this.data.count === 1) {
      wx.showToast({
        title: '不能再减了',
        icon: 'none'
      });
      return;
    }
    this.setData({
      count: this.data.count - 1
    });
    this.setData({
      allPrice: this.data.price * this.data.count * this.data.duration * this.data.discount
    });
  },
  increaseAction() {
    this.setData({
      count: this.data.count + 1
    });
    this.setData({
      allPrice: this.data.price * this.data.count * this.data.duration * this.data.discount
    });
  },
  changeNameAction(ev) {
    this.setData({
      name_value: ev.detail.value
    });
  },
  changePhoneNumberAction(ev) {
    this.setData({
      phoneNumber: ev.detail.value
    });
  },
  messageChangeAction(ev) {
    this.setData({
      message: ev.detail.value
    })
  },
  changePaymentAction(ev) {
    this.setData({
      payment_method: ev.detail.value
    })
  },
  // 获取picker组件的时间段
  getStartDateAction(res) {
    this.setData({
      start: res.detail
    });
    const child = this.selectComponent('.picker-date');
    this.setData({
      duration: child.data.duration
    });
    this.setData({
      allPrice: this.data.price * this.data.count * this.data.duration * this.data.discount
    });
  },
  getEndDateAction(res) {
    this.setData({
      end: res.detail
    })
    const child = this.selectComponent('.picker-date');
    this.setData({
      duration: child.data.duration
    });
    this.setData({
      allPrice: this.data.price * this.data.count * this.data.duration * this.data.discount
    });
  },
  // 提交订单
  submitOrder() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  payAction() {
    wx.showToast({
      title: '支付成功',
      icon: 'none',
      duration: 2000
    });
    // path："/api/order/addOrder"，
    // 方法：post
    // 参数：
    //     user  => 用户_id
    //     room => 房间_id  
    //     count => 数量,
    //     start => 开始时间,
    //     end => 结束时间,
    //     name => 用户名字,
    //     phone => 用户联系方式,
    //     message => 用户留言,
    //     price => 价格
    wx.request({
      url: `${this.data.path}api/order/addOrder`,
      method: "POST",
      data:{
        user:this.data.user_id,
        room:this.data.room_id,
        count:this.data.count,
        start:this.data.start,
        end:this.data.end,
        name:this.data.name_value,
        phone:this.data.phoneNumber,
        message:this.data.message,
        price:this.data.allPrice
      },
      success:(res)=>{
        console.log(res);
      }
    });
    wx.redirectTo({
      url: `../orderSuccess/orderSuccess?start=${this.data.start}&end=${this.data.end}&roomType=${this.data.roomType}&allPrice=${this.data.allPrice}&count=${this.data.count}`,
    });
  },
  closeModalAction() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  chooseCouponAction(res){
    wx.navigateTo({
      url: '../homeAboutPages/coupon/coupon'+'?'+'price='+res.currentTarget.dataset.price,
    });
  },
  data: {
    user_id:'',
    path:'',
    // 房间_id
    room_id: null,
    // 房间类型
    roomType: '',
    // 房间数量
    count: 1,
    // 开始时间
    start: 0,
    // 结束时间
    end: 0,
    // 入住人
    name_value: '',
    // 手机号
    phoneNumber: '',
    // 留言
    message: '',
    singalPrice: 0,
    allPrice: 0,
    // 支付方式
    payment_method: '',
    duration: 1,
    // 控制input与textarea穿透问题
    showModal: false,
    // vip等级
    vip_level: 1,
    // 折扣
    discount: 1,
    items: [{
        value: "wechat",
        image: "../../images/wechat.png",
        title: "微信支付",
        class: "wechat_pay",
        imageClass: "pay_logo"
      },
      {
        value: "remain",
        image: "../../images/remain.png",
        title: "余额支付",
        class: "remain_pay",
        imageClass: "pay_logo"
      },
      {
        value: "friend",
        image: "../../images/friend.png",
        title: "好友代付",
        class: "friend_pay",
        imageClass: "pay_logo"
      }
    ]
  },
  onLoad: function (options) {

    const App = getApp();
    console.log(App);
    this.setData({path:App.data.path,user_id:App.data.user._id});
    const vip = (1 && App.data.user.VIPCode);
    this.setData({
      vip_level: vip
    });
    if (this.data.vip_level === 0) {
      this.setData({
        discount: 1
      });
    } else if (this.data.vip_level === 1) {
      this.setData({
        discount: 9.5
      });
    } else if (this.data.vip_level === 2) {
      this.setData({
        discount: 9
      });
    } else if (this.data.vip_level === 3) {
      this.setData({
        discount: 8
      })
    } else {
      this.setData({
        discount: 1
      });
    }
    // 设置初始入住的日期和离店的日期
    const d = new Date();
    const initialStart = (d.getMonth() + 1) + '月' + (d.getDate()) + '日';
    const initialEnd = (d.getMonth() + 1) + '月' + (d.getDate() + 1) + '日';
    this.setData({
      start: initialStart,
      end: initialEnd
    });
    // 设置room_id
    this.setData({
      room_id: options.room_id,
      roomType: options.title,
      allPrice: options.price,
      price: options.price
    });
  },
})
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
    this.setData({allPrice:this.data.price*this.data.count*this.data.duration});
  },
  increaseAction() {
    this.setData({
      count: this.data.count + 1
    });
    this.setData({allPrice:this.data.price*this.data.count*this.data.duration});
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
  messageChangeAction(ev){
    this.setData({message:ev.detail.value})
  },
  changePaymentAction(ev) {
    this.setData({
      payment_method: ev.detail.value
    })
  },
  // 获取picker组件的时间段
  getStartDateAction(res) {
    this.setData({start:res.detail});
    const child = this.selectComponent('.picker-date');
    this.setData({duration:child.data.duration});
    this.setData({allPrice:this.data.price*this.data.count*this.data.duration});
  },
  getEndDateAction(res){
    this.setData({end:res.detail})
    const child = this.selectComponent('.picker-date');
    this.setData({duration:child.data.duration});
    this.setData({allPrice:this.data.price*this.data.count*this.data.duration});
  },
  // 提交订单
  submitOrder(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  data: {
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
    singalPrice:0,
    allPrice:0,
    // 支付方式
    payment_method: '',
    duration:1,
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
    // 设置初始入住的日期和离店的日期
    const d = new Date();
    const initialStart = (d.getMonth() + 1) + '月' + (d.getDate()) + '日';
    const initialEnd = (d.getMonth() + 1) + '月' + (d.getDate() + 1) + '日';
    this.setData({start:initialStart,end:initialEnd});
    // 设置room_id
    this.setData({room_id:options.room_id,roomType:options.title,allPrice:options.price,price:options.price});
  },
})
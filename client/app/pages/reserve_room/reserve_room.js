import pubsub from '../../plugin/pubsub';
// app/pages/reserve_room/reserve_room.js
import SetUser from '../../plugin/setUser'
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
      allPrice: (this.data.price * this.data.count * this.data.duration * this.data.discount).toFixed(2)
    });
  },
  increaseAction() {
    this.setData({
      count: this.data.count + 1
    });
    this.setData({
      allPrice: (this.data.price * this.data.count * this.data.duration * this.data.discount).toFixed(2)
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
      allPrice: (this.data.price * this.data.count * this.data.duration * this.data.discount).toFixed(2)
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
      allPrice: (this.data.price * this.data.count * this.data.duration * this.data.discount).toFixed(2)
    });
  },
  // 提交订单
  submitOrder() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  payAction() {
    if (this.data.payment_method === 'remain') {
      // 查询用户余额，再判断需不需要弹出确认支付框
      if (this.data.user.money < this.data.allPrice) {
        wx.showToast({
          title: '余额不足',
          icon: 'none'
        })
      } else {
        wx.request({
          url: `${this.data.path}api/user/pay`,
          method: "POST",
          data: {
            user: this.data.user._id,
            price: this.data.allPrice
          },
          success(res) {
            getApp().setUser(res.data.data)
          }
        })
      }
    }
    wx.request({
      url: `${this.data.path}api/order/addOrder`,
      method: "POST",
      data: {
        user: this.data.user._id,
        room: this.data.room_id,
        count: this.data.count,
        start: this.data.start,
        end: this.data.end,
        name: this.data.name_value,
        phone: this.data.phoneNumber,
        message: this.data.message,
        price: this.data.allPrice,
        night: this.data.duration,
        state: 1
      },
      success: (res) => {
        if(getApp().data.coupon){
          delete getApp().data.coupon;
        }
        
        console.log(res);
        wx.redirectTo({
          url: `../orderSuccess/orderSuccess?start=${this.data.start}&end=${this.data.end}&roomType=${this.data.roomType}&allPrice=${this.data.allPrice}&count=${this.data.count}`,
        });
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          duration: 2000
        });
        
      },
      fail() {
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
    wx.request({
      url: `${getApp().data.path}api/user/useCoupon`,
      method:"POST",
      data:{
        openID:getApp().data.openID,
        couponId:this.data.usingCouponId
      },
      success:(res)=>{
        console.log(res);
      },
      fail:(error)=>{
        console.log(error);
      }
    })
  },
  closeModalAction() {
    wx.request({
      url: `${this.data.path}api/order/addOrder`,
      method: "POST",
      data: {
        user: this.data.user._id,
        room: this.data.room_id,
        count: this.data.count,
        start: this.data.start,
        end: this.data.end,
        name: this.data.name_value,
        phone: this.data.phoneNumber,
        message: this.data.message,
        night: this.data.duration,
        price: this.data.allPrice
      },
      success: (res) => {
        console.log(res);
      }
    });
    this.setData({
      showModal: !this.data.showModal
    });
  },
  chooseCouponAction(res) {

    wx.navigateTo({
      url: '../homeAboutPages/coupon/coupon' + '?' + 'price=' + res.currentTarget.dataset.price,
    });
  },
  data: {
    appData: null,
    user: {},
    path: '',
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
    allPrice: 0,
    // 支付方式
    payment_method: 'wechat',
    duration: 1,
    // 控制input与textarea穿透问题
    showModal: false,
    // 折扣
    discount: 1,
    couponPrice: 0,
    couponCount: 0,
    usingCouponPrice:0,
    usingCouponId:0,
    items: [{
        value: "wechat",
        image: "../../images/wechat.png",
        title: "微信支付",
        class: "wechat_pay",
        imageClass: "pay_logo",
        checked: true
      },
      {
        value: "remain",
        image: "../../images/remain.png",
        title: "余额支付",
        class: "remain_pay",
        imageClass: "pay_logo",
        checked: false
      },
      {
        value: "friend",
        image: "../../images/friend.png",
        title: "好友代付",
        class: "friend_pay",
        imageClass: "pay_logo",
        checked: false
      }
    ]
  },
  onLoad: function (options) {
    // 将app的数据挂到页面的appData上,方便后续拿数据
    this.setData({
      appData: getApp().data,
      path: getApp().data.path
    });
    this.id = SetUser.call(this)
    if (this.data.appData.coupon) {
      this.setData({
        couponPrice: this.data.appData.coupon.price
      })
    };



    if (this.data.user.VIPCode === 0) {
      this.setData({
        discount: 1
      });
    } else if (this.data.user.VIPCode === 1) {
      this.setData({
        discount: 0.95
      });
    } else if (this.data.user.VIPCode === 2) {
      this.setData({
        discount: 0.9
      });
    } else if (this.data.user.VIPCode === 3) {
      this.setData({
        discount: 0.8
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
      allPrice: (options.price * this.data.discount).toFixed(2),
      price: options.price
    });

    // 获取优惠券信息
      wx.request({
        url: getApp().data.path + "api/user/allCoupon",
        method: "GET",
        data: {
          openID: getApp().data.openID
        },
        success: (res) => {
          const {
            coupon,
          } = res.data.data[0]
          const noUsedCoupon = coupon.filter(item => (
            Date.now() < Date.parse(item.end)
          ))
          // 挂载未使用优惠券的数量
          this.setData({couponCount:noUsedCoupon.length})
        }
      })
  },
  onShow(){
    console.log(getApp());
    if(getApp().data.coupon&&getApp().data.coupon.id){
      this.setData({usingCouponPrice:getApp().data.coupon.price,usingCouponId:getApp().data.coupon.id});
      this.setData({allPrice:this.data.allPrice - this.data.usingCouponPrice});
    }
  },
  onUnload: function () {
    pubsub.unSubscribe('user', this.id);
  }
})
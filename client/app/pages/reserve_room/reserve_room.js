// app/pages/reserve_room/reserve_room.js
Page({
  reduceAction(){
    if(this.data.room_count === 1){
      wx.showToast({
        title: '不能再减了',
        icon:'none'
      });
      return;
    }
    this.setData({room_count:this.data.room_count-1})
  },
  increaseAction(){
    this.setData({room_count:this.data.room_count+1});
  },
  changeNameAction(ev){
    this.setData({name_value:ev.detail.value});
  },
  changePhoneNumberAction(ev){
    this.setData({phoneNumber:ev.detail.value});
  },
  radioChange(ev){
    console.log(ev.detail);
  },
  changePaymentAction(ev){
    this.setData({payment_method:ev.detail.value})
  },
  data: {
    _id:null,
    rooType:'',
    room_count:1,
    name_value:'',
    phoneNumber:'',
    remark:'',
    payment_method:'',
    items:[
      {value:"wechat",image:"../../images/wechat.png",title:"微信支付",class:"wechat_pay",imageClass:"pay_logo"},
      {value:"remain",image:"../../images/remain.png",title:"余额支付",
      class:"remain_pay",imageClass:"pay_logo"},
      {value:"friend",image:"../../images/friend.png",title:"好友代付",
      class:"friend_pay",imageClass:"pay_logo"}
    ]
  },
  onLoad: function (options) {

  },
})
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
    this.setData({room_count:this.data.room_count+1})
  },
  data: {
    room_count:1
  },

  onLoad: function (options) {

  },
})
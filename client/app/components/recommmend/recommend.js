Component({

  properties: {
    roomInfo:Object,
    path:String
  },

  data: {
  },

  methods: {
    reserveRoomAction(ev){
      wx.navigateTo({
        url: `../../pages/reserve_room/reserve_room?room_id=${ev.currentTarget.dataset._id}&title=${ev.currentTarget.dataset.title}&price=${ev.currentTarget.dataset.price}`,
      })
    }
  }
})

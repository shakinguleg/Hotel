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
        url: `../../pages/reserve_room/reserve_room?_id=${ev.currentTarget.dataset._id}&title=${ev.currentTarget.dataset.title}`,
      })
    }
  }
})

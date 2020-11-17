Component({

  properties: {
    data:Object
  },

  data: {
    rate:4
  },

  methods: {
    reserveAction(){
      wx.navigateTo({
        url: '../../pages/reserve_room/reserve_room',
      })
    }
  }
})

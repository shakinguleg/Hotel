// app/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    server:[{
      con:'行李托管',
      src:'../../images/luggage.png'
    },
    {
      con:'休闲娱乐',
      src:'../../images/relaxation.png'
    },
    {
      con:'游泳池',
      src:'../../images/pool.png'
    },
    {
      con:'餐饮服务',
      src:'../../images/repast.png'
    },
    {
      con:'保险柜',
      src:'../../images/safe.png'
    },
    {
      con:'酒店WiFi',
      src:'../../images/wifi.png'
    },
    {
      con:'浴缸',
      src:'../../images/bathtub.png'
    },
    {
      con:'吹风机',
      src:'../../images/hair.png'
    },
  ],
    room: {
      "tag": [
          "舒适",
          "全景阳台",
          "温泉"
      ],
      "info": [
          [
              "房间面积",
              "65平方米"
          ],
          [
              "床型",
              "1.8m x 2m"
          ],
          [
              "可住人数",
              "2人"
          ],
          [
              "能否加床",
              "不可加床"
          ],
          [
              "是否含早餐",
              "含两位"
          ]
      ],
      "image": [
          `${getApp().data.path}roomImage/1.png`,
          `${getApp().data.path}roomImage/2.png`
      ],
      "_id": "5fb268ac2c360947c4a73db2",
      "id": "1001",
      "rate": "5",
      "time": "2020年11月16日 19时55分24秒",
      "cover": "roomImage/cover.png",
      "price": 588,
      "title": "舒适家庭房",
      "__v": 0
  },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: getApp().data.path + 'api/banner/banner?type=roomBanner',
        success:(res)=>{
          this.setData({
            banner:res.data.data[0].image.map(item => getApp().data.path + item)
          })
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
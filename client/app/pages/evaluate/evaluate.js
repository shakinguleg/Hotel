// app/pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  selectTags:[],
  
  data: {
      active:3,
      star:['#FF9103','#FF9103',"#FF9103",'#FF9103','#ccc'],
      tag:[
        {
          tit:"干净整洁",
          active:false
        },
        {
          tit:"菜品美味",
          active:false
        },
        {
          tit:"有耐心",
          active:false
        },
        {
          tit:"负责任",
          active:false
        },
        {
          tit:"服务到位",
          active:false
        },
        {
          tit:"价格合理",
          active:false
        },
      ],
      value:'',
      select:'请选择评价',
      
  },
  actionStar(ev){
    this.setData({
      active:ev.target.dataset.index
    })
  },
  selectTag(ev){
    let con = ev.target.dataset.tit;
   if(!this.selectTags.includes(con)){
     console.log(con);
     this.selectTags.push(con)
   let tags =   this.data.tag.find(item => item.tit === con)
   tags.active  = true
 
   }else{
    this.selectTags =  this.selectTags.filter(item => item != con)  
    let tags =   this.data.tag.find(item => item.tit === con)
   tags.active  = false
   }
   this.setData({
    select:this.selectTags.join(' ') || '请选择评价'
  })
  this.setData({
    tag:this.data.tag
  })
  },
  actionInput(ev){
    this.setData({
      value:ev.detail.value
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
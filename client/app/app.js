//app.js
import Pubsub from './plugin/pubsub'
App({
  data:{
      path:"http://eveal.cn:3030/"
  },
  setUser(user){
    this.data.user = user
    Pubsub.publish('user',user)
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.globalData = {}
    wx.cloud.callFunction({
      name:'login'
    }).then(res => {
      this.data.openID = res.result.openid
      wx.request({
        url: this.data.path + "api/user/check?openID=" + res.result.openid,
        method:"GET",
        success:(res2)=>{
          this.data.code = res2.data.code

          
          if(!res2.data.code){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }else{
            // this.data.user = res2.data.data
            this.setUser(res2.data.data)
          }
          
        }
      })
      
    })
  },

})

import Pubsub from './pubsub'
export default function(cb) {
  if(getApp().data.user){//如果app中已经有数据了
    //如果传了回调函数调用回调函数，没有将所有数据挂载到data中
    cb?cb(getApp().data.user):this.setData({user:getApp().data.user})
  }
  //监听数据修改事件
    return cb?Pubsub.subscribe('user',cb):Pubsub.subscribe('user',(user)=>{
      this.setData({
        user:user
      })
    })
}
import Pubsub from './pubsub'
export default function(cb) {
  if(getApp().data.user){
    cb?cb(getApp().data.user):this.setData({user:getApp().data.user})
    return cb?Pubsub.subscribe('user',cb):Pubsub.subscribe('user',(user)=>{
      this.setData({
        user:user
      })
    })
  }else{
    return cb?Pubsub.subscribe('user',cb):Pubsub.subscribe('user',(user)=>{
      this.setData({
        user:user
      })
    })

  }
}
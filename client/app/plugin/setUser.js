import Pubsub from './pubsub'
export default function() {
  if(getApp().data.user){
    this.setData({
      user:getApp().data.user
    })
  }else{
  let id = Pubsub.subscribe('user',(user)=>{
      this.setData({
        user:user
      })
    })
    console.log(id);
    
  }
}
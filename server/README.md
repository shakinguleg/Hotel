## 接口文档
### 用户操作
    1. 注册
        path："/api/user/register"，
        方法：post
        参数：
            openID  => 微信小程序返回的用户id
            nickName => 微信昵称
            avatarUrl => 头像地址
            gender => 性别

    2. 领取优惠券
        path："/api/user/getCoupon"，
        方法：post
        参数：
            openID  => 微信小程序返回的用户id
            couponId => 优惠券_id

    3. 查询用户优惠券
        path："/api/user/allCoupon"，
        方法：get
        参数：
            openID  => 微信小程序返回的用户id

    4. 使用优惠券
        path："/api/user/useCoupon"，
        方法：post
        参数：
            openID  => 微信小程序返回的用户id
            couponId => 优惠券_id  

    5. 充值
        path: "/api/user/recharge"
        方法：post
        参数：
            openID => 微信小程序返回的用户id
            count => 充值数量,
            VIPCode => 充值会员编码
    
    6. 支付
        path: "/api/user/recharge"
        方法：post
        参数：
            user => 用户_id
            price => 支付数量,
            
    7. 获取用户信息
        path: "api/user/userInfo"
        方法：get
        参数：
            openID => 微信小程序返回的用户id

    8. 检查是否注册
        path："api/user/check"
        参数：
            openID => 微信用户id
### 轮播图
    1. 获取轮播图
        path："/api/banner/banner"，
        方法：get
        参数：
            type  => "home"|"roomDetail" 首页和预订页面轮播图

### 优惠券
    1. 获取所有优惠券
        path："/api/coupon/allCoupon"，
        方法：get

### 餐饮
    1. 获取所有菜品
        path："/api/food/allFood"，
        方法：get

### 订单
    1. 生成订单
        path："/api/order/addOrder"，
        方法：post
        参数：
            user  => 用户_id
            room => 房间_id  
            count => 数量,
            start => 开始时间,
            end => 结束时间,
            name => 用户名字,
            phone => 用户联系方式,
            message => 用户留言,
            price => 价格
            state => 状态选填，默认为0


    2. 修改订单状态
        path："/api/order/updateState"，
        方法：post
        参数：
            orderId  => 订单_id
            state => 订单状态

    3. 获取所有订单
        path："/api/order/allOrder"，
        方法：get
        参数：
            user  => 用户_id


### 房间
    1. 获取所有房间
        path："/api/room/allRoom"，
        方法：get
    
    2. 房间评论
        path："/api/room/comment"，
        方法：post
        参数：
            user => 用户_id
            room => 房间_id
            rate => 评分
            content => 评论内容
            
    3. 获取房间评论
        path："/api/room/roomComment"，
        方法：get
        参数：
            roomId => 房间_id


### 充值券
    1. 获取所有充值券
        path："/api/recharge/allRecharge"，
        方法：get
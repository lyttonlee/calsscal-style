// 通过微信获取用户信息
export const wxGetUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        let userInfo = res.userInfo
        console.log(userInfo)
        resolve(userInfo)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

export const wxLoginByCloud = () => {
  wx.cloud.callFunction({
    name: 'login'
  }).then((res) => {
    // console.log(res)
    // 这里返回的res包含用户_id,openid,role,reginDate
    // 将信息写入storge
    let user = res.result
    console.log(user)
    try {
      user.openid && wx.setStorageSync('user', user)
    } catch (error) {
      console.log('用户信息写入storge失败！')
      console.log(error)
    }
  })
}

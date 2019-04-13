import {
  CHECKUSERLOGINED
} from './mutations-types'
const actions = {
  checkUserLogined ({commit, state}, payload) {
    // console.log(CHECKUSERLOGINED)
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          // console.log(res)
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                // console.log('login', res)
                let userinfo = res.userInfo
                // console.log(userinfo)
                wx.cloud.callFunction({
                  name: 'setUser',
                  data: userinfo
                }).then((res) => {
                  // console.log(res)
                  let user = res.result.data
                  // console.log(user)
                  wx.setStorage({
                    key: 'user',
                    data: user
                  })
                  commit(CHECKUSERLOGINED, user)
                })
              }
            })
          } else {
            resolve({
              logined: false
            })
          }
        }
      })
    })
  }
}
export default actions

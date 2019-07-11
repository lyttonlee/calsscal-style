const state = {
  userInfo: '',
  hasLogin: wx.getStorageSync('user').openid || false
}

export default state

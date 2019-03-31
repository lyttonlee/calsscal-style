const state = {
  userInfo: wx.getStorageSync('user') || {},
  hasLogin: wx.getStorageSync('user').openid || false
}

export default state

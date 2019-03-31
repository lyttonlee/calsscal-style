import Vue from 'vue'
import App from './App'
import store from './store/store'

import './common/iconfont.css'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
let wxCloudEnvId = 'classcal-style-1-2a3cc1'
// wx小程序云开发
wx.cloud.init({
  env: wxCloudEnvId,
  traceUser: true
})
let db = wx.cloud.database({env: wxCloudEnvId})
Vue.prototype.$db = db
const app = new Vue(App)
app.$mount()

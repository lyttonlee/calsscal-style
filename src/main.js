import Vue from 'vue'
import App from './App'
import store from './store/store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
// wx小程序云开发
wx.cloud.init({
  traceUser: true
})
let wxCloudEnvId = 'classcal-style-1-2a3cc1'
let db = wx.cloud.database({env: wxCloudEnvId})
Vue.prototype.$db = db
const app = new Vue(App)
app.$mount()

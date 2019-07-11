<script>
import {mapState} from 'vuex'
import {
  wxGetUserInfo,
  wxLoginByCloud
} from './wxModel'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      console.log(logs)
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
    // 在此处进行是否注册登录的判断
    this.userInit()
  },
  methods: {
    userInit () {
      if (this.hasLogin) {
        // 有用户数据
        // 。。。
        console.log('getUser')
        wxGetUserInfo().then((userInfo) => {
          console.log(userInfo)
        }).catch(err => console.log(err))
      } else {
        // meiyou
        // console.log(false)
        wxLoginByCloud()
      }
    }
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>

<template>
  <div v-if="hasLogin" class="my">
    <div class="user">
      <div class="left">
        <img class="avatar" :src="userInfo.avatarUrl" alt="">
      </div>
      <div class="right">
        <div class="nickname">{{userInfo.nickName}}</div>
        <div class="role">{{userInfo.role}}</div>
      </div>
    </div>
    <div class="content">
      <template v-for="(item, index) in menuList">
        <MyMenu 
          :key="index"
          :iconName="item.iconName"
          :menuText="item.menuText"
          :toUrl="item.toUrl"
        />
      </template>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapState
} from 'vuex'
import MyMenu from '@/components/MyMenu.vue'
import menuList from '@/data/menuList.js'
export default {
  data () {
    return {
      // hasLogin: false,
      // userinfo: {}
      menuList: menuList
    }
  },
  components: {
    MyMenu
  },
  computed: {
    ...mapState(['userInfo', 'hasLogin'])
  },
  methods: {
    ...mapActions(['checkUserLogined']),
    Login () {
      console.log('start')
      wx.cloud.callFunction({
        name: 'login'
      }).then((res) => {
        console.log(res)
        if (!res.result.hasRegined) {
          this.checkUserLogined()
        }
      })
    }
  },
  onLoad () {
    console.log(this.hasLogin)
    // this.userLogin()
    // 检查用户是否登录
    // wx.showLoading()
    !this.hasLogin && this.Login()
  },
  onShow () {
    // wx.hideLoading()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/main.less';
.my {
  .page;
  justify-content: start;
  .user {
    background-color: rgb(20, 119, 86);
    height: 30vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-items: center;
    align-items: end;
    padding-bottom: 80rpx;
    .avatar {
      width: 180rpx;
      height: 180rpx;
      border-radius: 50%;
      border: 1px solid #333;
    }
    .nickname {
      color: aliceblue;
      font-size: 0.6rem;
    }
    .role {
      color: rgb(230, 228, 225);
    }
  }
  .content {
    width: 100vw;
    height: 50vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 30rpx;
    justify-items: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 50rpx;
    padding: 0 30rpx;
  }
}
</style>

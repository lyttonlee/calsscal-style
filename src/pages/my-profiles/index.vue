<template>
  <div class="page">
    <view v-if="myProfiles.length > 0">
      <template v-for="(item, index) in myProfiles">
        <MyProfile @click.native="goDetailPage(item._id)" :key="index" :profileInfo="item" />
      </template>
    </view>
    <!-- <view class="empty" v-else>
      <text>空空如也</text>
      <button size="mini" type="primary" @tap="addProfile">添加一个作品</button>
    </view> -->
  </div>
</template>
<script>
import MyProfile from '../../components/MyProfile'
import {
  mapState
} from 'vuex'
export default {
  components: {
    MyProfile
  },
  data () {
    return {
      myProfiles: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    getMyProfiles () {
      // let that = this
      wx.cloud.callFunction({
        name: 'getProfiles',
        data: {
          type: 'my'
        }
      }).then((res) => {
        console.log(res)
        this.myProfiles = res.result.data
        wx.hideLoading()
      })
    },
    goDetailPage (id) {
      console.log(id)
      wx.navigateTo({
        url: '../profileDetail/main'
      })
    },
    addProfile () {
      wx.navigateTo({
        url: '../newProfile/main'
      })
    }
  },
  onLoad () {
    this.getMyProfiles()
    wx.showLoading({
      title: '正在努力加载中....'
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../common/main.less';
.page {
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgba(214, 218, 216, 0.425);
    height: 100vh;
  }
}
</style>

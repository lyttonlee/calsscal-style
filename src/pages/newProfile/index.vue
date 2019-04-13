<template>
  <view class="article">
    <input class="title" v-model="title" placeholder="请输入标题" type="text">
    <UploadImg @coverImg="coverImg"/>
    <MyRichText mode="editor" v-model="contentdata" @save="saveData" />
    <!-- {{contentData.length}} -->
    <view class="control">
      <button size="mini" type="default" @tap="saveArticle">保存</button>
      <button size="mini" type="primary" @tap="publishArticle">发布</button>
    </view>
  </view>
</template>
<script>
import MyRichText from '../../components/mpvue-rich-text/mpvue-rich-text'
import UploadImg from '../../components/UpLoadImage'
import {
  mapState
} from 'vuex'
import moment from 'moment'
export default {
  components: {
    MyRichText,
    UploadImg
  },
  data () {
    return {
      title: '',
      coverImage: '',
      contentData: [],
      profileId: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 保存文章
    saveArticle () {
      // console.log(this.contentData)
      let articleInfo = {
        title: this.title,
        coverImage: this.coverImage,
        contentData: this.contentData,
        saveTime: moment(new Date()).format('YYYY-MM-DD'),
        status: 'edit',
        profileId: this.profileId,
        openid: this.userInfo.openid
      }
      // console.log(articleInfo)
      wx.cloud.callFunction({
        name: 'saveProfile',
        data: articleInfo
      }).then((res) => {
        console.log(res)
        if (res.result._id) {
          this.profileId = res.result._id
        }
      })
    },
    // 发布文章
    publishArticle () {
      // console.log('publish')
      let articleInfo = {
        title: this.title,
        coverImage: this.coverImage,
        contentData: this.contentData,
        saveTime: moment(new Date()).format('YYYY-MM-DD'),
        status: 'publish',
        profileId: this.profileId,
        openid: this.userInfo.openid
      }
      // console.log(articleInfo)
      wx.cloud.callFunction({
        name: 'saveProfile',
        data: articleInfo
      }).then((res) => {
        console.log(res)
        if (res.result._id) {
          this.profileId = res.result._id
        }
        wx.navigateTo({
          url: '../my-profiles/main'
        })
      })
    },
    saveData (data) {
      // console.log(data)
      this.contentData = data
    },
    coverImg (cover) {
      // console.log(cover)
      this.coverImage = cover
    }
  }
}
</script>
<style lang="less" scoped>
.article {
  .title {
    border-bottom: 2rpx solid #ccc;
    height: 50rpx;
    font-size: 40rpx;
    line-height: 50rpx;
    margin: 20rpx 0;
    &:focus {
      border: 3rpx solid rgb(28, 118, 141);
    }
  }
  .control {
    width: 100%;
    margin-top: 50rpx;
    padding: 0 20rpx 40rpx 20rpx;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40rpx;
    button {
      width: 100%;
    }
  }
}
</style>

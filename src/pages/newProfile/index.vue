<template>
  <view class="article">
    <input class="title" v-model="title" placeholder="请输入标题" type="text">
    <UploadImg @coverImg="coverImg"/>
    <MyRichText mode="editor" @save="saveData" />
    <view class="control">
      <button size="mini" type="default" @tap="saveArticle">保存</button>
      <button size="mini" type="primary" @tap="publishArticle">发布</button>
    </view>
  </view>
</template>
<script>
import MyRichText from '../../components/mpvue-rich-text/mpvue-rich-text'
import UploadImg from '../../components/UpLoadImage'
export default {
  components: {
    MyRichText,
    UploadImg
  },
  data () {
    return {
      title: '',
      coverImage: '',
      contentData: []
    }
  },
  methods: {
    // 保存文章
    saveArticle () {
      console.log('save')
    },
    // 发布文章
    publishArticle () {
      console.log('publish')
    },
    saveData (data) {
      console.log(data)
      this.contentData = data
    },
    coverImg (cover) {
      console.log(cover)
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40rpx;
    button {
      width: 100%;
    }
  }
}
</style>

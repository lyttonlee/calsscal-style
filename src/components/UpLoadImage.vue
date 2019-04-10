<template>
  <view class="upload">
    <view class="add" v-if="!hasImg" @tap="addImage">
      <text class="icon iconfont icon-tubiaolunkuo-"></text>
      <text class="text">添加作品封面图片</text>
    </view>
    <image @tap="changeImage" v-else class="image" :src="coverImgUrl" mode="widthFix" lazy-load="true"></image>
  </view>
</template>
<script>
export default {
  data () {
    return {
      coverImgUrl: '',
      coverImgID: ''
    }
  },
  computed: {
    hasImg () {
      if (this.coverImgUrl) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addImage () {
      // ...
      console.log('add')
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          console.log(res)
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          wx.getImageInfo({
            src: tempFilePaths[0],
            success (res) {
              console.log(res)
              let {width, height} = res
              if (height / width > 1.3) {
                // 合法的宽高比
                // console.log('ok')
                // 上传图片
                // 拼接图片名字
                let fileType = tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 1]
                let fileName = (new Date()).valueOf() + tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 2] + '.' + fileType
                console.log(fileName)
                wx.cloud.uploadFile({
                  cloudPath: fileName,
                  // 文件路径
                  filePath: tempFilePaths[0]
                }).then(res => {
                  // get resource ID
                  // console.log(res.fileID)
                  // 换取真实的图片URL
                  wx.cloud.getTempFileURL({
                    fileList: [{
                      fileID: res.fileID
                    }]
                  }).then(res => {
                    // get temp file URL
                    // console.log(res.fileList)
                    // 将图片显示出来
                    // console.log(this)
                    that.coverImgUrl = res.fileList[0].tempFileURL
                    that.coverImaID = res.fileList[0].fileID
                    that.$emit('coverImg', {imgUrl: that.coverImgUrl, imgId: that.coverImaID})
                  })
                }).catch(error => {
                  // handle error
                  console.log(error)
                  if (error) {
                    wx.showToast({
                      title: '上传图片失败,请重新选择',
                      icon: 'none',
                      duration: 2000,
                      complete () {
                        wx.hideToast()
                      }
                    })
                  }
                })
              } else {
                // console.log('err')
                wx.showToast({
                  title: '图片宽高比不合法',
                  icon: 'none',
                  duration: 2000,
                  complete () {
                    wx.hideToast()
                  }
                })
              }
            }
          })
        }
      })
    },
    changeImage () {
      console.log('change')
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // console.log(res)
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          wx.getImageInfo({
            src: tempFilePaths[0],
            success (res) {
              // console.log(res)
              let {width, height} = res
              if (height / width > 1.3) {
                // 合法的宽高比
                // console.log('ok')
                // 上传图片
                // 拼接图片名字
                let fileType = tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 1]
                let fileName = (new Date()).valueOf() + tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 2] + '.' + fileType
                // console.log(fileName)
                // 先删除原来的图片
                wx.cloud.deleteFile({
                  fileList: [that.coverImgID]
                }).then(res => {
                  // handle success
                  console.log(res.fileList)
                  wx.cloud.uploadFile({
                    cloudPath: fileName,
                    // 文件路径
                    filePath: tempFilePaths[0]
                  }).then(res => {
                    // get resource ID
                    // console.log(res.fileID)
                    // 换取真实的图片URL
                    wx.cloud.getTempFileURL({
                      fileList: [{
                        fileID: res.fileID
                      }]
                    }).then(res => {
                      // get temp file URL
                      // console.log(res.fileList)
                      // 将图片显示出来
                      // console.log(this)
                      that.coverImgUrl = res.fileList[0].tempFileURL
                      that.coverImgID = res.fileList[0].fileID
                      that.$emit('coverImg', {imgUrl: that.coverImgUrl, imgId: that.coverImgID})
                    })
                  }).catch(error => {
                    // handle error
                    // console.log(error)
                    if (error) {
                      wx.showToast({
                        title: '上传图片失败,请重新选择',
                        icon: 'none',
                        duration: 2000,
                        complete () {
                          wx.hideToast()
                        }
                      })
                    }
                  })
                })
              } else {
                // console.log('err')
                wx.showToast({
                  title: '图片宽高比不合法',
                  icon: 'none',
                  duration: 2000,
                  complete () {
                    wx.hideToast()
                  }
                })
              }
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.upload {
  width: 100%;
  .add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin: 30rpx auto;
    height: 400rpx;
    box-shadow: 1px 1px 2px #ccc;
    .icon {
      font-size: 120rpx;
    }
    .text {
      color: rgb(151, 150, 148);
      font-size: 30rpx;
    }
  }
  .image {
    width: 100%;
  }
}
</style>

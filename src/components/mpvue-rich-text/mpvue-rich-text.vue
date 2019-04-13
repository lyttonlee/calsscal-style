<template>
<view>
  <view v-if="mode === 'editor'" class="content">
    <!-- editor -->
    <template v-for="(item, index) in dataList">
      <view :key="index" v-if="item.node === 'text' || item.node === 'textarea'">
        <text @tap="clickNode(index)" v-if="item.node === 'text'" class="text" >{{item.text}}</text>
        <!-- 弹出键盘的时候需要将内容顶起来 -->
        <textarea class="textarea" adjust-position v-if="item.node === 'textarea'"  auto-focus @blur="onEditChange(index)" v-model="onEditText"></textarea>
        <!-- 添加或删除该行的按钮 -->
        <view v-if="clickIndex === index" class="creator">
          <view @tap="addText(index)">
            <text class="icon iconfont icon-wenben"></text>
          </view>
          <view  @tap="addImage(index)">
            <text class="icon iconfont icon-tubiaolunkuo-"></text>
          </view>
          <view @tap="deleteRow(index)">
            <text class="icon iconfont icon-shanchu"></text>
          </view>
          <view @tap="editComplete">
            <text class="icon iconfont icon-huadong1"></text>
          </view>
        </view>
      </view>
      <view @tap="clickNode(index)" :key="index" v-if="item.node === 'image'">
        <image class="image" :src="item.src" mode="widthFix" lazy-load="true"></image>
        <!-- 添加或删除该行的按钮 -->
        <view v-if="clickIndex === index" class="creator">
          <view @tap="addText(index)">
            <text class="icon iconfont icon-wenben"></text>
          </view>
          <view  @tap="addImage(index)">
            <text class="icon iconfont icon-tubiaolunkuo-"></text>
          </view>
          <view @tap="deleteRow(index)">
            <text class="icon iconfont icon-shanchu"></text>
          </view>
          <view @tap="editComplete">
            <text class="icon iconfont icon-huadong1"></text>
          </view>
        </view>
      </view>
    </template>
    <!-- creator -->
    <view v-if="statu === 'onAdd'" class="add-item">
      <view @tap="addText">
        <text class="icon iconfont icon-wenben"></text>
      </view>
      <view  @tap="addImage">
        <text class="icon iconfont icon-tubiaolunkuo-"></text>
      </view>
      <view  @tap="saveData">
        <text class="icon iconfont icon-tianjiawenben1"></text>
      </view>
    </view>
  </view>
  <view v-if="mode === 'show'"  class="content">
    <template v-for="(item, index) in dataList">
      <view :key="index" v-if="item.node === 'text'">
        <text  v-if="item.node === 'text'" class="text" >{{item.text}}</text>
      </view>
      <view :key="index" v-if="item.node === 'image'">
        <image class="image" :src="item.src" mode="widthFix" lazy-load="true"></image>
      </view>
    </template>
  </view>
</view>
  
</template>
<script>
import {randomString} from '../../utils/'
export default {
  model: {
    prop: 'dataLists',
    event: 'save'
  },
  props: {
    mode: {
      required: true,
      type: String
    },
    dataLists: {
      type: Array
    }
  },
  data () {
    return {
      // mode: 'editor',
      onEditText: '',
      statu: 'onAdd',
      // 初始5000,我觉得没人会写5000段落
      clickIndex: 5000,
      dataList: this.dataLists || []
    }
  },
  methods: {
    addText (index) {
      // .....
      // index 存在
      if (index >= 0) {
        // 此时是在当前行的下面添加一行
        this.dataList.splice(index, 0, {
          node: 'text',
          text: '点击我修改内容!'
        })
        this.init()
        // todo
      } else {
        // 此时是在末尾追加一行
        // todo
        this.dataList.push({
          node: 'text',
          text: '点击我修改内容!'
        })
        this.init()
      }
    },
    addImage (index) {
      // index 存在
      if (index >= 0) {
        // 此时是在当前行的下面添加图片
        console.log(index)
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // console.log(res)
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            // 上传图片
            // 拼接图片名字
            let fileType = tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 1]
            let fileName = (new Date()).valueOf() + randomString(16) + '.' + fileType
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
                that.dataList.splice(index, 0, {
                  node: 'image',
                  src: res.fileList[0].tempFileURL,
                  fileID: res.fileList[0].fileID
                })
                that.init()
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
          }
        })
        // todo
      } else {
        // 此时是在末尾追加一行
        // todo
        // console.log('last')
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // console.log(res)
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            // 上传图片
            // 拼接图片名字
            let fileType = tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length - 1]
            let fileName = (new Date()).valueOf() + randomString(16) + '.' + fileType
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
                that.dataList.push({
                  node: 'image',
                  src: res.fileList[0].tempFileURL,
                  fileID: res.fileList[0].fileID
                })
                that.init()
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
          }
        })
      }
    },
    clickNode (index) {
      // 判断是否是重复点击
      if (this.statu === 'onEdit') {
        // 是的话就先初始化
        this.init()
      } else {
        // 让statu变为 onEdit
        this.statu = 'onEdit'
        // 为clickIndex赋值
        this.clickIndex = index
        // console.log(this.clickIndex)
        // 文本的情况
        if (this.dataList[index].node === 'text') {
          // 让文本变为多行输入框
          this.dataList[index].node = 'textarea'
          // 把文本的值赋给 this.onEditText
          this.onEditText = this.dataList[index].text
          // 图片的情况
        } else if (this.dataList[index].node === 'image') {
          // 显示
        }
      }
    },
    onEditChange (index) {
      // 当多行输入框失去光标的时候,说明用户推出了修改或者输入完成
      // 将输入框的值还回去
      this.dataList[index].text = this.onEditText
      // 将输入框变为文本
      this.dataList[index].node = 'text'
      // 将点击的序号还原为undefined
      this.init()
    },
    // 删除当前行
    deleteRow (index) {
      // 删除行是图片的时候
      if (this.dataList[index].node === 'image') {
        // 先将存于云服务器上对应的图片删除
        let that = this
        wx.cloud.deleteFile({
          fileList: [this.dataList[index].fileID]
        }).then(res => {
          // handle success
          console.log(res.fileList)
          that.dataList.splice(index, 1)
          // this.clickIndex = undefined
          that.init()
        })
      } else {
        this.dataList.splice(index, 1)
        // this.clickIndex = undefined
        this.init()
      }
    },
    editComplete () {
      this.init()
    },
    init () {
      this.clickIndex = 5000
      this.statu = 'onAdd'
      // this.bindParent()
      this.$emit('save', this.dataList)
    },
    saveData () {
      this.$emit('save', this.dataList)
    },
    autoSaveData () {
      if (this.mode === 'editor') {
        // 每隔5分钟保存数据
        this.timer = setInterval(() => {
          this.$emit('save', this.dataList)
        }, 300000)
      }
    }
  },
  mounted () {
    this.saveData()
    this.autoSaveData()
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  .text {
    width: 100%;
  }
  textarea {
    border: 1rpx dashed #777;
    width: 750rpx;
    padding: 10rpx;
    box-sizing: border-box;
    background-color: rgb(231, 227, 227);
  }
  .image {
    min-width: 750rpx;
  }
  .creator, .add-item {
    display: flex;
    width: 100%;
    background-color: aliceblue;
    // grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    align-items: center;
    // border: 1rpx dashed #777;
    // margin: 0 20rpx;
    padding: 20rpx 0;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px #ccc;
    .icon {
      font-size: .7rem;
    }
  }
}
</style>

<template>
  <div @click="toPath" class="item">
    <i :class="['icon','iconfont', iconName]"></i>
    <div>{{menuText}}</div>
  </div>
</template>
<script>
export default {
  props: {
    iconName: {
      required: true,
      type: String
    },
    menuText: {
      required: true,
      type: String
    },
    toUrl: {
      default: '../my-profiles/main'
    }
  },
  data () {
    return {
      // icon: this.iconName
    }
  },
  methods: {
    toPath () {
      // console.log(1)
      wx.navigateTo({
        url: this.toUrl
      })
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  background-color: rgb(255, 255, 255);
  padding: 50rpx 0;
  width: 100%;
  font-size: .3rem;
  text-align: center;
  .icon {
    font-size: 40px;
    color:rgb(20, 119, 86);
  }
}
</style>

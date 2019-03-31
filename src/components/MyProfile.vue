<template>
  <div class="profile">
    <image mode="aspectFit" class="img" src="../../static/images/col-1.jpg"></image>
    <div class="right">
      <div class="title">琴棋书画的优美琴棋书画的优美琴画的优美</div>
      <div class="date">2019-3-25</div>
      <view class="author">
        <text class="name">{{userInfo.nickName}}</text>
        <text class="role">{{userInfo.role}}</text>
      </view>
      <div class="sumary">
        <div class="love">
          <text class="icon iconfont icon-xihuan1"></text> 32
        </div>
        <div class="comments">
          <text class="icon iconfont icon-pinglun1"></text> 120
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
<style lang="less" scoped>
.profile {
  display: flex;
  // grid-template-columns: 1fr 3fr;
  // flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100vw;
  // height: 25vh;
  margin: 20rpx 0;
  box-sizing: border-box;
  box-shadow: 0 1px 5px #666;
  .img {
    flex: 1;
    padding-left: 10rpx; 
    width: 100%;
    max-height: 300rpx;
  }
  .right {
    flex: 3;
    text-align: left;
    padding: 20rpx 10rpx 10rpx 20rpx;
    view {
      margin: 5rpx 0;
    }
    .title {
      font-size: .4rem;
    }
    .date {
      color: rgb(102, 101, 101);
      font-size: .2rem;
    }
    .author {
      .name {
        font-size: .8em;
        color: #444;
      }
      .role {
        margin-left: 20rpx;
        font-size: .6em;
        color: #666;
      }
    }
    .sumary {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      .icon {
        font-size: 40rpx;
        color: rgb(163, 55, 22);
      }
      div {
        flex: 1;
      }
    }
  }
}
</style>

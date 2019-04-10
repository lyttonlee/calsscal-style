<template>
  <div class=".page">
    <MyProfile />
    <MyProfile />
  </div>
</template>
<script>
import MyProfile from '../../components/MyProfile'
export default {
  components: {
    MyProfile
  }
}
</script>
<style lang="less" scoped>
@import '../../common/main.less';
.page {

}
</style>

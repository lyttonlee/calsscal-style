<template>
  <div class="home">
    <h1>index</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    // this.$db.collection('User').get().then((res) => {
    //   console.log(res)
    // })
  }
}
</script>
<style lang="less" scoped>
@import '../../common/main.less';
.home {
  .page;
}
</style>

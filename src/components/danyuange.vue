<template>
<!-- 这个页面是单元格的封装 -->
  <div class="cell">
   <div class="left">{{zuo}}</div>
   <div class="right">{{you}} <span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props: ['zuo','you']

}
</script>

<style lang='less' scoped>
.cell{
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    > .right{
        font-size: 13px;
        color: #888;
    }
}
</style>
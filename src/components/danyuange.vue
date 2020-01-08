<template>
<!-- 这个页面是单元格的封装 -->
  <div class="cell" @click="dianji">
   <div class="left">{{zuo}}</div>
   <div class="right">{{type==='password'?'******':you}}<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props: ['zuo','you','type'],
   //修改点击
   methods: {
       dianji(event){
          this.$emit('click',event) 
       }
   }
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
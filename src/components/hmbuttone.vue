<template>
  <div id="btn">
     <slot></slot>
  </div>
</template>

<script>
export default {

}
</script> 

<style lang='less' scoped>
 #btn{
     /* 公式是固定的   318得根据设计稿来定 100vw与360 */
     width: 318*100vw/360;
     height: 50px;
     background-color: green;
     border-radius: 25px;
     line-height: 50px;
     text-align: center;
     color: #fff;
     font-size: 20px
 }

</style>
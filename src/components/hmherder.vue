<template>
  <div class="header">
   <!-- 封装顶部的栏目：分左 中 右 三个 -->
   <div>
       <slot name='left'></slot>
   </div>
   <div class="center"> <slot>{{tilte}}</slot> </div>
   <div>
       <slot name='right'></slot>
   </div>
  </div>
</template>

<script>
export default {
    props: ['tilte'],
    }


</script>

<style lang='less' scoped>
.header{
    width: 100%;
    height: 50px;
    //弹性布局
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    //nth-of-type(1)这个保险点  不会因为引入组件（组件有时候会自动生成结构）而影响找元素  这个是符合元素才找
    > div :nth-child(1), div :nth-child(3){
        padding: 0 10px;
    }
    > div :nth-child(2){
        font-weight: bold;
        text-align: center;
    }
    
}
</style>
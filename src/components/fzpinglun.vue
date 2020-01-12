<template>
  <div class="pl">
    <fzpinglun v-if="parent.parent" :parent="parent.parent" @suibian='dianji' ></fzpinglun>

    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="dianji(parent)">回复（直接子组件，也有递归的回复）</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
// 调用自己本身的组件
export default {
  props: ["parent"],
  //自己调用自己
  name: "fzpinglun",

  methods: {
    dianji(parent){
      //可以得到点击的当前框的所有信息，要告诉父组件
    // console.log(parent);
     this.$emit('suibian',parent)
    },
    
  }
};
</script>

<style lang="less" scoped>
.pl {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>

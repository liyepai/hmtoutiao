<template>
  <div class="pl">
    <fzpinglun v-if="parent.parent" :parent="parent.parent"></fzpinglun>
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span>回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
// 调用自己本身的组件
export default {
  props: ["parent"],
  name: "fzpinglun"
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

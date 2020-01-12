<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="sousuo(userKey)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <a href="javascript:;" v-for="(v, i) in guangjianzi" :key="i" @click="sousuo(v)">{{ v }}</a>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link to="" v-for="(itme, index) in sousuoList" :key="index">{{
        itme.title
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { sousuo } from "../apis/article";
export default {
  data() {
    return {
      userKey: "",
      sousuoList: [],
      guangjianzi: []
    };
  },
  mounted () {
      this.guangjianzi=JSON.parse(localStorage.getItem('cunguanjianzi'))
  },
  methods: {
    async sousuo(key) {
        // this.sousuoList.lenth=0
      let res = await sousuo({ keyword: key });
      console.log(res);
      
    //   if (res.data.data.length > 0) {
        this.sousuoList = res.data.data;
    //   }
      //在外部定义好个方法  获取本地存储搜素关键字  如果没有就返回个空
      let arr = this.getdata();
      let index = arr.indexOf(key);
      console.log(index);

      if (index !== -1) {
        arr.splice(index, 1);
      }
      //将关键字 存进去数组
      arr.unshift(key);

      //重新存进去本地
      localStorage.setItem("cunguanjianzi", JSON.stringify(arr));
      this.guangjianzi=JSON.parse(localStorage.getItem("cunguanjianzi"))
      
   
    },
    getdata() {
      //如果有就返回  没有就放回个空数组
      return JSON.parse(localStorage.getItem("cunguanjianzi") || "[]");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>

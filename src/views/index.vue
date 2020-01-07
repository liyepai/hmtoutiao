<template>
  <div class="index">
    <!-- //头部栏 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" id="ic" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      </div>
    </div>
    <!-- 便签页 -->
    <div class="tabs">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 遍历动态生成栏目标签 -->
        <van-tab
          :title="cateKey.name"
          v-for="cateKey in cateList"
          :key="cateKey.id"
        >
          <!-- 遍历动态生成新闻数据 -->
          <xinwenlan
            v-for="danqian in cateKey.postList"
            :key="danqian.id"
            :shuju="danqian"
          ></xinwenlan>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
//获取所有栏目
import { getCateList } from "../apis/cate";
import { getPostList } from "../apis/article";
import xinwenlan from "../components/xinwenlan";
export default {
  components: {
    xinwenlan
  },
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0, //让有没有登录情况下 都能默认停留在头条页
      id: "",
      cateList: [] //存我们去到的栏目  存到个属性 循环动态生成
    };
  },

  watch: {
    //  滑动触发与点击触发 栏目 可以获得到栏目名与栏目id  我们可以不用去注册点击触发事件与滑动触发事件
    //直接监听我们这个active  一旦变化就触发
    //监听这个变量:无论移动还是惦记 这个变量都会变得  所有  一旦变化 我们就重新发送请求
    //  this.into();是个请求的方法
    active() {
      //可以获取到当前栏目的id  可以就可以发送请求 获取数据  其实我们下面已经写好了
    //一旦我们点击了就发送请求加载了这时已经存到数据  生成好了 
    //如果点击别的  然后又回头点击这个  又得发送请求加载一次 这样不好 
    //如果这个存新闻数据的数组长度是0  就是 之前没有点击加载过 那么才发送请求加载
    if(this.cateList[this.active].postList.length ===0){
         this.into();
    }
    }
  },

  async mounted() {
    let res = await getCateList();
    this.cateList = res.data.data;

    //改造  加页面条数 存储的新闻数据的数组 停留的页面
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [],
        pageSize: 10,
        pageIndex: 1
      };
    });
    //发送请求动态渲染新闻块
    this.into();
  },
  methods: {
    async into() {
      let id = this.cateList[this.active].id;
      let res2 = await getPostList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: id
      });
      //将这个数据 存到我们定义的数组里
      this.cateList[this.active].postList = res2.data.data;
      //当前这个对象已经有数据了  动态渲染起来
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  background-color: rgb(158, 41, 41);
  color: #fff;
  align-items: center;
  .iconnew {
    font-size: 60px;
    padding: 0 10px;
  }
  .user {
    font-size: 30px;
    padding: 0 10px;
  }
  .search {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    line-height: 40px;
  }
}
</style>

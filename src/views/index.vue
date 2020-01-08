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
          <van-list
            v-model="cateKey.loading"
            :finished="cateKey.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <van-pull-refresh
              v-model="cateKey.isLoading"
              @refresh="onRefresh"
              success-text="刷新成功"
            >
              <xinwenlan
                v-for="danqian in cateKey.postList"
                :key="danqian.id"
                :shuju="danqian"
                @click="$router.push({path:`/xianfqing/${danqian.id}`})"
              ></xinwenlan>
            </van-pull-refresh>
          </van-list>

          <!-- 遍历动态生成新闻数据 -->
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
import { setTimeout } from "timers";
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
    active() {
      if (this.cateList[this.active].postList.length === 0) {
        this.into();
      }
    }
  },

  async mounted() {
    let res = await getCateList();
    this.cateList = res.data.data;
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [],
        pageSize: 6, //一页显示6条数据
        pageIndex: 1,
        //增加改造:下拉加载
        loading: false, //这个栏目的加载状态，
        finished: false, //这个栏目数据是否加载完成
        //上拉刷新新数据
        isLoading: false
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

      //上面执行完  这步才执行   false  表示执行完成
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false;
      }

      //重置刷新的标记，让他能刷新  如果不设置，我们先下啦加载到最后，再上拉加载  加载完再下拉 那么他是没有加载到数据的
      //因为到底面的时候
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false;
      }
      if (res2.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
      this.cateList[this.active].postList.push(...res2.data.data);
    },

    //自动触发load事件
    onLoad() {
      this.cateList[this.active].pageIndex++;
      setTimeout(() => {
        this.into();
      }, 1000);
    },
    onRefresh() {
      //刷新，重置页面为第一页

      console.log(111);

      this.cateList[this.active].pageIndex = 1;
      //清空数据重新请求
      this.cateList[this.active].postList.length = 0;

      this.into();

      //重置
      this.cateList[this.active].finished = false;
    },
   
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

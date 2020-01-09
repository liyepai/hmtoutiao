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
                @click="$router.push({ path: `/xianfqing/${danqian.id}` })"
              ></xinwenlan>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getCateList } from "../apis/cate";
import { getPostList } from "../apis/article";
import xinwenlan from "../components/xinwenlan";

export default {
  components: {
    xinwenlan
  },
  data() {
    return {
      //有没有登录都停留头条栏
      active: localStorage.getItem("token") ? 1 : 0,
      cateList: []
    };
  },

  watch: {
    active() {
      //如果当前的栏目中储存数据里没有数据过，证明没加载过，如果有，证明有加载过不需要重复加载
      if (this.cateList[this.active].postList.length === 0) {
        this.into();
      }
    }
  },

  async mounted() {
    //获取栏目分类数据
    let res = await getCateList();
    //存进到我们的数组里
    this.cateList = res.data.data;
    //改造数据：业务需要
    this.cateList = this.cateList.map(value => {
      return {
        //当前栏目里的内容
        ...value,
        //以后存放当前栏目的数据
        postList: [],
        //每页展示6条数据
        pageSize: 6,
        //停留的页面
        pageIndex: 1,
        //List组件的两个属性，每个栏目都是独立的
        // 这个栏目的加载状态：不加载
        loading: false,
        //这个栏目的数据是否完全加载完毕：没有加载完
        finished: false,
        //
        isLoading: false
      };
    });

    this.into();
  },
  methods: {
    async into() {
      let id = this.cateList[this.active].id;
      let res2 = await getPostList({
        //后台接口需要我们传的参数
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: id
      });
      //如果loading为true了，那么证明加载成功了，得让他不再加载
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false;
      }
      //
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false;
      }
      //如果请求获取到的数组小于 我们设置一页所展示的条数，证明 没数据了
      if (res2.data.data.length < this.cateList[this.active].pageSize) {
        //没数据了就是加载完了，没得加载了。
        this.cateList[this.active].finished = true;
      }
      //用push，第二页的数据会添加进我们存放数据的数组，而且得展开的添加进去，
      //不然他整体添加进去就只是算一个对象，这个对象里有多条数据，不是我们要的
      //如果用 赋值的方式，后面刷新请求加载的会覆盖前面所存在的
      this.cateList[this.active].postList.push(...res2.data.data);
    },

    //拉倒底部时，会自动触发这个事件
    onLoad() {
      if (this.cateList[this.active].isLoading == false) {
        //进来了证明需要加载第二页了，所有多加一页
        this.cateList[this.active].pageIndex++;
        setTimeout(() => {
          //加载数据
          this.into();
        }, 1000);
      }
    },

    //刷新数据：可能有新的数据 重新刷新
    onRefresh() {
      //让停留的还是第一页，第一页的第一天数据是最新的数据
      this.cateList[this.active].pageIndex = 1;
      //情况我们存放新闻数据的数组，有新的数据才可以重新获取再重新生成
      this.cateList[this.active].postList.length = 0;
      //加载数据
      this.into();
      //如果我们刷新新的数据前，已经做了加载全部数据，
      //当加载完全部数据这个finished就会为true
      //如果我们这时做了刷新新数据，再来加载全部数据
      //这时finished还是为true，所有就加载不到
      this.cateList[this.active].finished = false;
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

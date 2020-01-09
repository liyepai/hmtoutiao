<template>
  <div class="comments">
    <myheader tilte="精彩评论">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <div class="lists" v-for="aa in pinglun" :key="aa.id">
      <div class="item">
        <div class="head">
          <img :src="aa.head_img" alt />
          <div>
            <p>{{ aa.user.nickname }}</p>
            <span>{{ aa.user.create_date }}</span>
          </div>
          <span @click="huifu(aa)">回复层</span>
        </div>
        <!-- 上面是头像那一栏   要判断 万一他没有parent是会报错的-->
        <!-- 有些再第一次就parent: null了 -->
        <fzpinglun v-if="aa.parent" :parent="aa.parent"></fzpinglun>
        <!-- 下面是第一次的评论 -->
        <div class="text">{{ aa.content }}</div>
      </div>
    </div>
    <!-- 底部栏 -->
    <dibulan
      :post="xingxi"
      @shuaxin="keyishuaxin"
      :obj="kongobj"
      @congzi="kongobj = null"
    ></dibulan>
  </div>
</template>

<script>
import myheader from "../components/hmherder";
import { getpinglun, getArticleById } from "../apis/user";
//评论的组件
import fzpinglun from "../components/fzpinglun.vue";
//引入底部模块
import dibulan from "../components/dibulan";

export default {
  components: {
    myheader,
    fzpinglun,
    dibulan
  },
  data() {
    return {
      pinglun: [],
      xingxi: {},
      kongobj: null
    };
  },

  async mounted() {
    this.init();
    let res2 = await getArticleById(this.$route.params.id);
    // console.log(res2.data.data);
    this.xingxi = res2.data.data;
  },
  methods: {
    //加载数据
    async init() {
      //请求
      let res = await getpinglun(this.$route.params.id, {
        pageSize: 40,
        pageIndex: 1
      });
      // console.log(res);
      this.pinglun = res.data.data.length > 0 ? res.data.data : this.pinglun;

      //修改图片路径
      this.pinglun = this.pinglun.map(value => {
        value.head_img = "http://127.0.0.1:3000" + value.user.head_img;
        return value;
      });
    },

    keyishuaxin() {
      //dibulan组件传过来的事件 他叫我们重新加载数据 刷新页面让留到窗口最前
    
      this.init();
      window.scrollTo(0, 0);
    },

    //点击回复触发
    huifu(aa) {
      //aa是上面循环的对象
      // console.log(aa);

      this.kongobj = aa;
    }
  }
};
</script>

<style lang="less" scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>

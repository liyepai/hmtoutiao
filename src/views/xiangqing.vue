<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="guangzhu" :class="article.has_follow ? 'red' : ''">{{
        article.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ this.article.title }}</div>
      <div class="desc">
        <span>{{ article.user.nickname }}</span> &nbsp;&nbsp;
        <span>{{ this.article.user.create_date }}</span>
      </div>
      <!-- 图片 -->
      <div
        class="content"
        v-html="article.content"
        v-if="article.type === 1"
      ></div>
      <!-- 如果是视频 -->
      <video :src="article.content" v-if="article.type === 2" controls></video>

      <div class="opt">
        <span
          class="like"
          :class="article.has_like ? 'reds' : ''"
          @click="dianzan"
        >
          <van-icon
            name="good-job-o"
            :class="article.has_like ? 'reds' : ''"
          />{{ `点赞${article.like_length}` }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <dibu :post='article'></dibu>
  </div>
</template>

<script>
import { getArticleById, guangzhu, quxiao, dianzan } from "../apis/user";
import dibu from "../components/dibulan";
export default {
  components: {
    dibu
  },
  data() {
    return {
      article: {
        user: ""
      }
    };
  },

  async mounted() {
    //发送请求动态渲染
    let res = await getArticleById(this.$route.params.id);

    this.article = res.data.data;
  },
  methods: {
    async guangzhu() {
      let res;
      if (this.article.has_follow) {
        res = await quxiao(this.article.user.id);
      } else {
        res = await guangzhu(this.article.user.id);
      }
      // 刷新
      this.article.has_follow = !this.article.has_follow;
      this.$toast.success(res.data.message);
    },
    async dianzan() {
      let res = await dianzan(this.article.id);
      console.log(res);

      if (res.data.message == "点赞成功") {
        ++this.article.like_length;
      } else {
        --this.article.like_length;
      }
      this.article.has_like = !this.article.has_like;
      this.$toast.success(res.data.message);
    },
   
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    color: #000;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo > {
      width: 100%;
      /deep/ a {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
    
  }
}
.red {
  background-color: #f00;
}
.reds {
  color: red;
}
</style>

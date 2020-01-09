<template>
  <div class="comments1">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="$router.push({ name: 'Pinglun' })">
        <i class="iconfont iconpinglun-"></i>
        <em>{{ this.post.comment_length }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: post.has_star }"
        @click="isshoucan"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="fasong">发送</span>
        <span @click="quxiao">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { shoucan } from "../apis/user";
//发布一级评论的请求
import { fabu } from "../apis/article";
export default {
  //接收父类传过来的键 obj  是个对象
  props: ["post", "obj"],
  data() {
    return {
      isFocus: false
    };
  },
  //监听父类传过来的obj对象
  watch: {
    obj() {

      console.log(this.obj);
      
      // console.log('监听到了变化');
      //如果变化了 就是代表点击到回复  这是 让弹框显示
      if (this.obj) {
        console.log(123);
        
        this.isFocus = true;
      }
    }
  },

  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      this.$refs.commtext.focus();
    },

    async isshoucan() {
      let res = await shoucan(this.post.id);
      this.post.has_star = !this.post.has_star;
      this.$toast.success(res.data.message);
    },
    async fasong() {
      // console.log(this.obj);
      
      //获取框内的发送框的值:content是我们请求服务器带过去的数据
      let data = {
        content: this.$refs.commtext.value
      };
      //重点重点：如果父类有过来的对象  证明点击的是回复
      //回复的请求是要带着id的  是指定要回复那个人的  在请求接口里有写
      if (this.obj) {
        data.parent_id = this.obj.id;
      }
      let res1 = await fabu(this.post.id, data);
      console.log(res1);
      if (res1.data.message == "评论发布成功") {        
        //让发布框消失，
        this.isFocus = false;
        //清空框里的内容
        this.$refs.commtext.value = "";
        //告诉父组件（jincaipinglun）刷新页面
        //这个shuaxin是事件  父组件是要接收得 然后刷新页面加载数据
        this.$emit("shuaxin");
      }
    },
    quxiao() {
      this.isFocus = false;
      //告诉父类 让他把定义的对象设置为null  这样他才有了变化  后面才可以继续想评论再评论
      this.$emit("congzi");
    }
  }
};
</script>

<style lang="less" scoped>
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #000;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #000;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.comments1 {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
}
.addcomment {
  color: #000;
  background-color: #fff;
}
.active {
  color: red;
}
</style>

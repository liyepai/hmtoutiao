<template>
  <div id="login">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>

      <div class="inputs">
        <!-- 这里插入我们封装的框与按钮 -->
        <!-- 登录 -->
        <hminput
          placeholder="请输入用户名/手机号"
          v-model="users.username"
          :zhengze="/^(1\d{10})$|^(\d{5,6})$/"
          msg="输入的用户名或手机号不对"
        ></hminput>
        <!-- 密码 -->
        <hminput
          placeholder="请输入用户密码"
          v-model="users.password"
          :zhengze="/^\S{3,8}$/"
          msg="输入的密码不对"
        ></hminput>
        <hminput
          placeholder="请输入用户昵称"
          v-model="users.nickname"
          :zhengze="/^\w+$/"
          msg="输入的密码不对"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/Login" class="">去登录</a>
      </p>

      <hmbuttom @click="zhuce"> 注册</hmbuttom>
    </div>
  </div>
</template>

<script>
import hmbuttom from "@/components/hmbuttone";
import hminput from "@/components/hminput";
import { register } from "../apis/user";
//引入我们api接口的模块

export default {
  components: {
    hmbuttom,
    hminput
  },
  data() {
    return {
      users: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    async zhuce() {
      if (
        /^(1\d{10})$|^(\d{5,6})$/.test(this.users.username) &&
        /^\S{3,8}$/.test(this.users.password) &&
        /^\w+$/.test(this.users.nickname)
      ) {
        //如果满足基本要求 就发送请求
        let res = await register(this.users);
        if (res.data.message === "注册成功") {
          this.$toast.fail("注册成功即将跳转登录页面");
          this.$router.push({ name: "Login" });
        } else if (res.data.message === "用户名已经存在") {
          this.$toast.fail("用户已存在");
        }
      } else {
        this.$toast.fail("请根据提示填写注册信息");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>

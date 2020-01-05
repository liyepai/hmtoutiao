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
          :zhengze="/^\S{3,8}/"
          msg="输入的密码不对"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>

      <hmbuttom @click="denglu"> 登录吗</hmbuttom>
    </div>
  </div>
</template>

<script>
import hmbuttom from "@/components/hmbuttone";
import hminput from "@/components/hminput";
//引入我们api接口的模块
import {login} from "@/apis/user";
export default {
  components: {
    hmbuttom,
    hminput
  },
  data() {
    return {
      users: {
        username: "10086",
        password: "123"
      }
    };
  },
  methods: {
    //点击登录  发送请求 使用async关键字与await关键字，可以让我们使用同步的方式  来调用异步的方法
    //async关键字标记的是：当前的方法中有异步操作
    // await关键字标记的是：改方法执行完，后面的代码 方法 才会执行

    //应该  符合我们正则的条件 才要发送请求登录
    async denglu() {
      if (
        /^(1\d{10})$|^(\d{5,6})$/.test(this.users.username) &&
        /^\S{3,8}/.test(this.users.password)
      ) {
        //调用接口 使用关键字 代表 得执行完这一步   后面的代码开可以执行  同步
        let res = await login(this.users); //记得，我们刚刚设置接口 是需要穿参进去的
        if (res.data.message === "用户不存在") {
          this.$toast(res.data.message);
        } else {
          //否则登录成功
          //登录成功把数据里的token值保存起来  在导航守卫可以用到
          localStorage.setItem('token',res.data.data.token)
          //将用户的id 保存起来 在后面需要用到
          localStorage.setItem('userId',res.data.data.user.id)

          //我们修改了路由  那么成功跳转这个路径得加上id
          // this.$router.push({name:'Personal'})
          this.$router.push({path:`/personal/${res.data.data.user.id}`})
        }
      } else {
        this.$toast.fail("用户数据输入不合法");
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

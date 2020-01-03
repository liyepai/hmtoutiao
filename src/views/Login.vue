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
         :zhengze='/^(1\d{10})$|^(\d{5,6})$/'
         msg='输入的用户名或手机号不对'
        ></hminput>
        <!-- 密码 -->
          <hminput
         placeholder="请输入用户密码"
         v-model="users.password"
         :zhengze='/^\S{3,8}/'
         msg='输入的密码不对'
        ></hminput>
      </div> 
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>

      <hmbuttom> 登录吗</hmbuttom>
    </div>
  </div>
</template>

<script>
import hmbuttom from "@/components/hmbuttone";
import hminput from '@/components/hminput'
export default {
  components: {
    hmbuttom,hminput
  },
  data () {
    return {
      users:{
        username:'',
        password:''
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

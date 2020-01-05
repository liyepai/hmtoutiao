<template>
  <div class="personal">
    <router-link  :to="`/editPersonal/${gerenxinxi.id}`">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="gerenxinxi.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{gerenxinxi.nickname}}
          </div>
          <div class="time">{{gerenxinxi.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <!-- 引用的是封装的单元格 -->
   <danyuange zuo='我的关注' you='关注的用户'></danyuange>
   <danyuange zuo='我的跟帖' you='跟帖/回复'></danyuange>
    <danyuange zuo='我的收藏' you='文章/视频'></danyuange>
    <danyuange zuo='设置'></danyuange>
    <mybtn class="mybtn">退出</mybtn>
  </div>
</template>
>
<script>
import danyuange from '../components/danyuange'
import mybtn from '../components/hmbuttone'
import {getById} from '../apis/user'
export default {
  data () {
    return {
      gerenxinxi:{}
    }
  },
    components: {
      danyuange,mybtn
    },
    async mounted () {
      // console.log(this.$route.params.id);//拿到路由上的id
      //调用获取个人详情接口
      let res = await getById(this.$route.params.id)
      // console.log(res);
      if(res.data.message==='获取成功'){
        this.gerenxinxi=res.data.data
        //修改图片  需要拼接我们服务器的基地址  
        this.gerenxinxi.head_img='http://127.0.0.1:3000'+ this.gerenxinxi.head_img
        // console.log(this.gerenxinxi.head_img);/uploads/image/IMG1568705287936.jpeg
        
      }else {
        //因为我们响应的拦截器里设置了 用户信息验证失败 失败后的处理 使用这可不写
        // this.$router.pust({name:'Login'})
      }
      
      
    }

}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.mybtn {
  margin:  20px auto;
  background-color: #f00;
}
</style>
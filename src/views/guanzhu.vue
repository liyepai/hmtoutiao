<template>
  <div class="focus">
      <myheader tilte='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()">返回</span>
      </myheader>
      <div class="list" v-for="(aa, index) in yonghuList" :key="aa.id">
          <div class="box" >
              <img :src="aa.head_img" alt="">
              <div class="center">
                  <p>{{aa.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="quxiao(aa.id,index)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '../components/hmherder'
import {huoquguanzhu,quxiaoguanzhu} from '../apis/user'
export default {
  components: {
    myheader
  },
  data () {
      return {
          yonghuList:[]
      }
  },
  async  mounted () {
      let res = await huoquguanzhu()
      console.log(res);
      this.yonghuList=res.data.data.map(value=>{
          value.head_img='http://127.0.0.1:3000' + value.head_img
          return value
      })
    //   console.log(this.yonghuList)
  },
  methods: {
     async quxiao(id,index){
       let res =await quxiaoguanzhu(id)
       console.log(res);
       console.log(index);
       if(res.data.message ==="取消关注成功"){
          this.$toast.success(res.data.message)
          this.yonghuList.splice(index,1)
       }
    
       
       
      }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>

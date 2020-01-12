<template>
  <div class="gl">
    <div class="shang">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <p>栏目管理</p>
    </div>

    <div class="zhong">
      <h2>点击删除以下频道</h2>
      <div>
        <span v-for="(item,index) in cateList" :key="item.id" @click="shanchu(index)">{{item.name}}</span>
      </div>
    </div>
      <div class="zhong">
      <h2>点击添加以下频道</h2>
      <div>
            <span v-for="(item,index) in weitianjia" :key="item.id" @click="tianjia(index)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
 import { getCateList } from "../apis/cate";
export default {
  data () {
      return {
        cateList:[],
        weitianjia:[]
      } 
  },
async  mounted () {
    //思路：页面一进来，判断本地有没有存过这些栏目数据，如果有，将本地的赋值给我们定义的cateList进行渲染
    //如果没有就发送请求获取 存到cateList进行渲染 再存到本地
    //获取已添加栏目
    if(localStorage.getItem('cateList')){
       this.cateList= JSON.parse(localStorage.getItem('cateList'))
    }else{
    let res = await getCateList()
    this.cateList =res.data.data
    //判断有没有登录 有登录，页面保留的有两个头条关注是固定有的 变化的只有后面这十几个能让你变化
    if(localStorage.getItem('token')){
      this.cateList=this.cateList.splice(2)
    }else{
      this.cateList=this.cateList.splice(1)
    }
    }

    //获取
   
  },
  methods: {
      shanchu(index){
      //点击了删除，将删除的这个添加到存放删除的数据  然后在删除框里移除这个要删除的  再存本地 一个村已经删除的  已经存未删除的
      //添加到存放删除的数据里
      this.weitianjia.push(this.cateList[index])
       //再移除删除框里的
       this.cateList.splice(index,1)
       //存本地
       //已经添加的栏目
       localStorage.setItem('yitianjia',JSON.stringify(this.cateList))
       //未添加，也就是已经删除
       localStorage.setItem('yishanchu',JSON.stringify(this.weitianjia))
      },
      tianjia(index){   
          
       this.cateList.push(this.weitianjia[index])
       //再移除删除框里的
       this.weitianjia.splice(index,1)
       //存本地
       //已经添加的栏目
       localStorage.setItem('yitianjia',JSON.stringify(this.cateList))
       //未添加，也就是已经删除
       localStorage.setItem('yishanchu',JSON.stringify(this.weitianjia))
      }
  }

};
</script>

<style lang="less" scoped>
.shang {
  width: 100%;
  height: 50px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 20px;
    padding-left: 20px;
  }
  p {
    flex: 1;
    text-align: center;
    font-weight: 500;
  }
}
.zhong {
  h2 {
    margin: 20px 0;
  }
  div {
    display: flex;
    flex-wrap: wrap;
  }
  div > span {
    border: 1px solid #000;
    padding: 5px 13px;
    text-align: center;
    margin-right: 15px;
  }
}
</style>

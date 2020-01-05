<template>
  <input type="text" class="myinput"   :class="{'green':statu,'red':!statu}"   @input="jianyan" @blur="inputblur">
</template>

<script>
export default {
//接收那边传过来的正则表达式 用于等等我们判断是否符合条件
props: ['zhengze','msg'],  
data () {
    return {
        //用来判断是不是符合条件
        statu:true
    } 
}, 
methods: {
    jianyan(error){ 
    let value = error.target.value
    //利用父类 传过来的正则表达式  来判断  我们这个框内的值 是否符合，如果符合  就
     if(this.zhengze && this.zhengze.test(value)){
       this.statu=true
     }else{
         this.statu=false
     }
     //同时告诉父亲 把这个值带过去 让他修改
     this.$emit('input',value)
    },
    inputblur(error){
    let value = error.target.value
     if(this.zhengze &&  !this.zhengze.test(value)){
      console.log(this.msg);
       this.$toast.fail(this.msg);
     }
    }
}

} 
</script>


<style lang='less' scoded>
.myinput{
    width: 318/360*100vw;
    height: 60px;
    outline: none;
    border:none;
    border-bottom: 2px solid #ccc;
    font-size: 20px;
    line-height: 60px;
}
.green{
    border-bottom-color: green;
}
.red{
    border-bottom-color: red;
}

</style>
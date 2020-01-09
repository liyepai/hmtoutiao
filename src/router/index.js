import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Personal from '../views/Personal.vue'
import editPersonal from '../views/editPersonal.vue'
import Index from '../views/index.vue'
import Register from '../views/register.vue'
import Xianfqing from '../views/xiangqing.vue'
import Guanzhu from '../views/guanzhu.vue'
import Pinglun from '../views/jincaipinglun.vue'
Vue.use(VueRouter)

let router =new VueRouter({
    routes:[
        {
            name:'Login',
            path:'/login',
            component: Login
        },
        {
            name:'Pinglun',
            path:'/pinglun/:id',
            component: Pinglun
        },
        {
            name:'Guanzhu',
            path:'/guanzhu',
            component: Guanzhu
        },
        // 我们跳转到个人中心页面  得根据id来跳转 才能获取对于的数据 渲染个人中心页面的信息
        {
            name:'Personal',
            path:'/personal/:id',
            component: Personal
        },
        {
            name:'editPersonal',
            path:'/editPersonal/:id',
            component: editPersonal
        },
        {
            name:'Index',
            path:'/index',
            component: Index
        },
        {
            name:'Register',
            path:'/register',
            component: Register
        },
        {
            name:'Xianfqing',
            path:'/xianfqing/:id',
            component: Xianfqing
        },
    ]
})
//在这里做导航守卫 看看登录时是否有token值
//导航守卫：前置守卫：在跳转之前进行调用
//所有的路由跳转请求都会结果这个导航守卫
//to：目标路由，from：源路由  next：下一步操作  就是用户当前需要进行的操作

router.beforeEach((to, from, next) => {
 //验证是否访问的是个人中心页面
 if(to.path.indexOf('/personal') ===0){
  let token=localStorage.getItem('token')
  if(token){
    next()
  }else{
      //如果没有token  就 跳转到登录页面登录
      next({name:'Login'})
  }
 }else{
     //如果不是访问授权的网站就直接执行下一步 比如新闻页面 不需要登录
     next()
 }
  
})




export default router
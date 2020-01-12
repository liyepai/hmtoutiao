import axios from '@/utils/myaxios'

//登录请求
export const login =(data)=>{
   return axios({
       method:'post',
       url:'/login',
       data
   })
}
//根据id获取用户详情
export const getById=(id)=>{
   return axios({
       //默认请求是get所以不需要写方式
       url:`user/${id}`,
       //设置自定义请求头  后台规定 Authorization用这个key  值是我们的token
       //如果没设置 就算我们发送请求  也获取失败
       //后面的请求 都需要这种认证  如果我们每次都需要设置 那么很麻烦  
       // 所以 我们可以用axios的拦截器来做 每次请求前 先设置 去我们设置axios设置的基准路径
    //    headers:{'Authorization':localStorage.getItem('token')}
   })
}
export const updateUserById =(id,data)=>{
      return axios({
         method:'post',
         url:`/user_update/${id}`,
         data
      })
}
//用户注册
export const register =(data)=>{
   return axios ({
      method:'post',
      url:'/register',
      data
   }) 

}
//获取新闻详情的接口
export const getArticleById =(id)=>{
   return axios ({
      url:`/post/${id}`
   }) 
}
//关注用户
export const guangzhu =(id)=>{
    return axios({
       url:`/user_follows/${id}`
    })
}
//取消
export const quxiao =(id)=>{
   return axios({
      url:`/user_unfollow/${id}`
   })
}
//点赞
export const dianzan =(id)=>{
   return axios({
      url:`/post_like/${id}`
   })
}
//收藏
export const shoucan =(id)=>{
   return axios({
      url:`/post_star/${id}`
   })
}
//用户关注列表
export const huoquguanzhu=()=>{
   return axios({
      url:`/user_follows`
   })
}
//取消关注

export const quxiaoguanzhu=(id)=>{
   return axios({
      url:`/user_unfollow/${id}`
   })
}
//获取评论列表
export const getpinglun =(id,params)=>{
    return axios({
       url:`/post_comment/${id}`,
       params
    })
}
export const getUserStars = ()=>{
   return axios({
       url:`/user_star`
   })
}
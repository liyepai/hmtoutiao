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
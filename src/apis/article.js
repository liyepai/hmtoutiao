import axios from '../utils/myaxios'
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params    
    })
}
//获取新闻数据的列表

//发布评论
export const fabu =(id,data)=>{
  return axios ({
      method:'post',
      url:`/post_comment/${id}`,
      data
  })
}

//搜索文章
export const sousuo =(params)=>{
    return axios ({  
        url:`/post_search`,
        params
    })
  }
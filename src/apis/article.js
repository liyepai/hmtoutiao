import axios from '../utils/myaxios'
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params    
    })
}
//获取新闻数据的列表
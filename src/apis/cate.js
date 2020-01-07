import axios from '../utils/myaxios'

export const getCateList =()=>{
    return axios({
        url:'/category'
    })
}
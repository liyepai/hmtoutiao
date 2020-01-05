import axios from '../utils/myaxios'

export const uploadFile=(data)=>{
   return axios({
       method:'post',
       url:'/upload',
       data
   })
}
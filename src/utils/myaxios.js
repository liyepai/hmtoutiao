//axios的封装
// 设置我们基准路径 然后暴露
import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000'

export default axios
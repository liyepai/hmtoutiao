import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
//引入全局样式
import '@/style/reset.css'
import { Toast,Uploader,Dialog,Field  } from 'vant';
Vue.use(Toast) //轻提示
   .use(Uploader)//文件上传的组件
   .use(Dialog )
   .use(Field)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

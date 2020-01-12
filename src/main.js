import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
//引入全局样式
import '@/style/reset.css'
import { Toast,Uploader,Dialog,Field,Picker, Icon,Tab, Tabs,List,PullRefresh,Search } from 'vant';
Vue.use(Toast) //轻提示
   .use(Uploader)//文件上传的组件
   .use(Dialog )
   .use(Field)
   .use(Picker)
    .use(Icon)
   .use(Tab)
   .use(Tabs)
   .use(List)
   .use(PullRefresh)
   .use(Search)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

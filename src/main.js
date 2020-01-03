import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
//引入全局样式
import '@/style/reset.css'
import { Toast } from 'vant';
Vue.use(Toast);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

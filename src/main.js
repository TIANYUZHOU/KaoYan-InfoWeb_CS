import Vue from 'vue'
import App from './App.vue'
// 引入emui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

//引入store
import store from './store'

// 引入路由
import router from './router';

Vue.config.productionTip = false
// 使用emui组件库
Vue.use(ElementUI);
Vue.use(Antd);

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')

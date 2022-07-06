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

// 引入vue-echarts
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// 手动引入 ECharts 各模块来减小打包体积

import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent
]);

// 全局注册组件（也可以使用局部注册）
Vue.component('v-chart', ECharts)

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')

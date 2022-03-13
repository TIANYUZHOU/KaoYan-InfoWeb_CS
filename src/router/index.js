// 路由

import Vue from 'vue'

//引入 组件
import Schools from '../pages/Schools'
import Majoys from '../pages/Majoys'
import Subjects from '../pages/Subjects'
import Materials from '../pages/Materials'

//引入VueRouter
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: '/schools',
      component: Schools
    },
    {
      path: '/majoys',
      component: Majoys
    },
    {
      path: '/subjects',
      component: Subjects
    },
    {
      path: '/materials',
      component: Materials
    }
    
  ]
})

//暴露router
export default router
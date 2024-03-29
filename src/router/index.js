// 路由

import Vue from 'vue'

//引入 组件
// import Schools from '../pages/Schools'
// import Majoys from '../pages/Majors'
// import Subjects from '../pages/Subjects'
// import Materials from '../pages/Materials'
// import UserProfile from '../pages/UserProfile'
// import Index from '../pages/Index'

//引入VueRouter
import VueRouter from 'vue-router'

const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: '',
      // component: Index
      component: resolve => require(['@/pages/Index'],resolve)
    },
    {
      path: '/schools',
      // component: Schools,
      component: resolve => require(['@/pages/Schools'],resolve)
    },
    {
      path: '/majors',
      // component: Majoys
      component: resolve => require(['@/pages/Majors'],resolve)
    },
    {
      path: '/subjects',
      // component: Subjects
      component: resolve => require(['@/pages/Subjects'],resolve)
    },
    {
      path: '/materials',
      // component: Materials
      component: resolve => require(['@/pages/Materials'],resolve)
    },
    {
      path: '/userProfile',
      // component: UserProfile
      component: resolve => require(['@/pages/UserProfile'],resolve)
    }

  ]
})

//暴露router
export default router
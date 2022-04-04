// 路由

import Vue from 'vue'

//引入 组件
import Schools from '../pages/Schools'
import Majoys from '../pages/Majors'
import Subjects from '../pages/Subjects'
import Materials from '../pages/Materials'
import UserProfile from '../pages/UserProfile'

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
      path: '/schools',
      component: Schools
    },
    {
      path: '/majors',
      component: Majoys
    },
    {
      path: '/subjects',
      component: Subjects
    },
    {
      path: '/materials',
      component: Materials
    },
    {
      path: '/userProfile',
      component: UserProfile
    }

  ]
})

//暴露router
export default router
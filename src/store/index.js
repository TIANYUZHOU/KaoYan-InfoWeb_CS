//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)


//准备actions对象——响应组件中用户的动作
const actions = {
  // changeNavId(context, value) {
  //   context.commit('ChangeNavId', value)
  // }
}
//准备mutations对象——修改state中的数据
const mutations = {
  ChangeNavId(state, value) {
    state.navbarId = value
  },
  ChangeLoginState(state, value) {
    state.isLogin = value
  },
  AddUserInfo(state, value) {
    state.userInfo.user_id = value.user_id
    state.userInfo.username = value.username
    state.userInfo.avatar = value.avatar
    state.userInfo.token = value.access ? value.access : value.token
    state.userInfo.colId = value.colId
    // 登录直接存入数组不用转化，通过本地存储localstorage只能存字符串需要转化
    state.userInfo.schIdList = typeof (value.schIdList) === 'string' ? value.schIdList.split(',') : value.schIdList
  }
}
//准备state对象——保存具体的数据
const state = {
  navbarId: 1,
  // isLogin:true
  isLogin: false,
  userInfo: {
    user_id: '',
    username: '',
    avatar: '',
    token: '',
    colId: '', // 收藏夹id
    schIdList: [] // 用户收藏对的学校id
  },
}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
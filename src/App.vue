<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <Layout />
    </a-locale-provider>
  </div>
</template>

<script>
  import Layout from './components/Layout.vue'

  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import moment from 'moment'
  import 'moment/locale/zh-cn'

  moment.locale('zh-cn')
  export default {
    name: 'App',
    components: {
      Layout,
    },
    data() {
      return {
        zh_CN,
      }
    },
    mounted() {
      this.getLocalStorage()
    },
    methods: {
      getLocalStorage() {
        const user = {
          user_id: localStorage.user_id,
          username: localStorage.username,
          avatar: localStorage.avatar,
          token: localStorage.token,
          colId: localStorage.colId,
          schIdList: localStorage.schIdList,
        }
        this.$store.commit('AddUserInfo', user)
      },
    },
  }
</script>

<style>
  body,
  ul,
  ol,
  li,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  table,
  td,
  img,
  div {
    margin: 0;
    padding: 0;
    border: 0;
  }
  body {
    min-width: 1300px;
  }
</style>

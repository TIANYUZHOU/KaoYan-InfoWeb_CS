<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
  import Layout from './components/Layout.vue'

  export default {
    name: 'App',
    components: {
      Layout,
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

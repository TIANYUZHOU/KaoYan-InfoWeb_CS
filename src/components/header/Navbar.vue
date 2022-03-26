<template>
  <div class="main">
    <div class="logo">
      <img src="../../assets/nav_logo.png" alt="logo" />
    </div>
    <div class="button-left">
      <router-link
        @click.native="changeNavId(2)"
        active-class="active"
        tag="button"
        to="/schools"
        ><span>学校</span></router-link
      >
      <router-link
        @click.native="changeNavId(3)"
        active-class="active"
        tag="button"
        to="/majoys"
        ><span>专业</span></router-link
      >
      <router-link
        @click.native="changeNavId(4)"
        active-class="active"
        tag="button"
        to="/subjects"
        ><span>科目</span></router-link
      >
      <router-link
        @click.native="changeNavId(5)"
        active-class="active"
        tag="button"
        to="/materials"
        ><span>资料</span></router-link
      >
    </div>
    <!-- 注册/登录按钮及表单 -->
    <Registe-and-login />
    <!-- 用户卡片按钮及表单 -->
    <User-Card />
  </div>
</template>

<script>
  import UserCard from './UserCard/UserCard'
  import RegisteAndLogin from './RegisteAndLogin/RegisteAndLogin'
  export default {
    name: 'Navbar',
    components: { RegisteAndLogin, UserCard },
    data() {
      return {}
    },
    methods: {
      // 改变vuex 中Navbar的id
      changeNavId(id) {
        this.$store.commit('ChangeNavId', id)
      },
    },
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .logo {
    height: 70px;
    float: left;
  }
  .logo > img {
    height: 100%;
  }
  .button-left {
    float: left;
    margin-left: 50px;
  }
  .button-left button {
    display: inline-block;
    background-color: #ffffff;
    border-radius: 20px;
    border: 1px solid #dcdfe6;
    color: #000000;
    text-align: center;
    font-size: 14px;
    width: 76px;
    height: 40px;
    line-height: 40px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }
  .button-left button span {
    text-align: center;
    height: 100%;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  .button-left button:hover {
    color: #409eff;
    border-color: #a5cefa;
    background-color: #ecf5ff;
  }
  .button-left button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }
  .button-left button:hover span {
    padding-right: 15px;
  }
  .button-left button:hover span:after {
    opacity: 1;
    right: 0;
  }
  .active {
    color: #409eff !important;
    border-color: #4591e4 !important;
    background-color: #ecf5ff !important;
  }
  
</style>
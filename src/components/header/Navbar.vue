<template>
  <div class="main">
    <div class="logo">
      <img src="../../assets/nav_logo.png" alt="logo" />
    </div>
    <div class="button-left">
      <!-- <el-button @click="changeNavId(3)" round>专业</el-button>
      <el-button @click="changeNavId(4)" round>科目</el-button> -->
      <router-link @click.native="changeNavId(2)" active-class="active" tag="button" to="/schools"
        ><span>学校</span></router-link
      >
      <router-link @click.native="changeNavId(3)" active-class="active" tag="button" to="/majoys"
        ><span>专业</span></router-link
      >
      <router-link @click.native="changeNavId(4)" active-class="active" tag="button" to="/subjects"
        ><span>科目</span></router-link
      >
      <router-link @click.native="changeNavId(5)" active-class="active" tag="button" to="/materials"
        ><span>资料</span></router-link
      >
    </div>
    <div class="button-right">
      <el-button round type="info">注册</el-button>
      <el-button round type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
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
  .button-right {
    float: right;
    margin-right: 30px;
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
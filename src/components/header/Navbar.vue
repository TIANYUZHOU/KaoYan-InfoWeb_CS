<template>
  <div class="main">
    <div class="logo">
      <img src="../../assets/nav_logo.png" alt="logo" />
    </div>
    <div class="button-left">
      <!-- <el-button @click="changeNavId(3)" round>专业</el-button>
      <el-button @click="changeNavId(4)" round>科目</el-button> -->
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
    <div v-if="!this.$store.state.isLogin" class="button-right">
      <el-button round type="info">注册</el-button>
      <el-button round type="primary">登录</el-button>
    </div>
    <div v-if="this.$store.state.isLogin" class="button-right">
      <a-popover
        v-model="visible"
        :title="userName + ' 的账户'"
        trigger="click"
      >
        <template slot="content">
          <div id="firdiv">
            <div>
              <a-tooltip>
                <template slot="title"> 我的收藏 </template>
                <a-button
                  style="background-color: #f8b595; border-color: #f8b595"
                  type="primary"
                  shape="circle"
                  icon="star"
                />
              </a-tooltip>
            </div>
            <div>
              <a-tooltip>
                <template slot="title"> 个人资料 </template>
                <a-button
                  style="background-color: #f67280; border-color: #f67280"
                  type="primary"
                  shape="circle"
                  icon="file"
                />
              </a-tooltip>
            </div>
          </div>
          <a-divider />
          <div id="secdiv">
            <div>
              <a-tooltip>
                <template slot="title"> 意见反馈 </template>
                <a-button
                  style="background-color: #455d7a; border-color: #455d7a"
                  type="primary"
                  shape="circle"
                  icon="solution"
                />
              </a-tooltip>
            </div>
            <div>
              <a-tooltip>
                <template slot="title"> 关于 </template>
                <a-button
                  style="background-color: #233142; border-color: #233142"
                  type="primary"
                  shape="circle"
                  icon="idcard"
                />
              </a-tooltip>
            </div>
          </div>
          <a-divider />
          <div id="thrdiv">
            <a-button type="danger" shape="round"> 退出 </a-button>
          </div>
        </template>
        <a-button type="link" shape="circle"> <a-avatar src="https://assets.leetcode-cn.com/aliyun-lc-upload/users/shu-sheng-40/avatar_1581912063.png" icon="user" /> </a-button>
      </a-popover>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        visible: false, // 气泡卡片配置
        userName: 'TIANYUZHO',
      }
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
  #firdiv {
    display: flex;
    justify-content: center;
  }
  #firdiv > div {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  #secdiv {
    display: flex;
    justify-content: center;
  }
  #secdiv > div {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  #thrdiv {
    display: flex;
    justify-content: center;
  }
</style>
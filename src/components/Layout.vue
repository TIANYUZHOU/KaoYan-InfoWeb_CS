<template>
  <div>
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <!-- <secNavbar /> -->
        <router-view></router-view>
        <!-- <Schools /> -->
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  import Navbar from './header/Navbar.vue'
  // import Schools from '../pages/Schools.vue'
  // import secNavbar from './main/secNavbar.vue'
  export default {
    components: { Navbar, },
    name: 'Layout',
    data() {
      return {}
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #ffffff;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
    border-bottom: 1px #e7e7e7 solid;
    /* border-top: 1px #e7e7e7 solid; */
  }
  .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    /* background-color: #e9eef3; */
    /* background-color: #ffffff; */
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
    padding: 0px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
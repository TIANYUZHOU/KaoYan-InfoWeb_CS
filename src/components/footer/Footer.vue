<template>
  <div class="footer">
    <div style="padding: 10px 50px">
      <a-row :gutter="150">
        <a-col :span="8">
          <a-card title="开源与自链接" :bordered="false">
            <!-- <p><a-icon type="github" theme="filled" /><a href=""> GitHub</a></p>
            <p><a-icon type="github" theme="filled" /><a href=""> 院校</a></p> -->
            <ul>
              <li><a href=""> GitHub</a></li>
              <li><a href="#/schools"> 院校</a></li>
              <li><a href="#/majors"> 专业</a></li>
              <li><a href="#/subjects"> 科目</a></li>
              <li><a href="#/materials"> 资料</a></li>
            </ul>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="友情链接" :bordered="false">
            <ul>
              <li><a href="https://yz.chsi.com.cn/"> 研招网</a></li>
              <li><a href="https://www.kaoyan.com/"> 考研帮</a></li>
              <li><a href="http://www.okaoyan.com/"> 考研派</a></li>
            </ul>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="关于「上岸吧」" :bordered="false">
            <p>「上岸吧」是一款用于计算机考研信息查询的网站系统，致力于为计算机类专业考生确定目标院校时期提供信息查询服务。</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!--版权信息-->
    <div class="copy">
      <div class="container">
        <p>
          Copyright &copy; 2022
          <a href="https://ztyzhou.com" target="blank">TIANYUZHOU</a> /上岸吧/
        </p>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style>
  .footer {
    margin: 20px 20px 0 20px;
  }
</style>
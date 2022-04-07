<template>
  <div id="background">
    <a-result
      title="欢迎进入『上岸吧』计算机考研信息查询系统。"
      sub-title="接下来你可以点击右上方的“注册”按钮进行用户注册，或者多点击“登录”按钮进行登录操作。"
    >
      <template #icon>
        <a-icon type="smile" theme="twoTone" />
      </template>
      <template #extra>
        <a-popconfirm
          title="赶快点击右上角登录吧！"
          ok-text="好的"
          cancel-text="取消"
          placement="bottom"
        >
          <a href="#"><a-button type="primary"> 我知道了 </a-button></a>
        </a-popconfirm>
      </template>
    </a-result>
  </div>
</template>
<script>
  export default {
    name: 'Index',
    data() {
      return {}
    },
  }
</script>

<style scoped>
  #background {
    background-image: url(/src/assets/background.png);
    height: 650px;
    padding-top: 5%;
  }
</style>
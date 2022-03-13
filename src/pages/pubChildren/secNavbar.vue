<template>
  <div class="secNavbar">
    <div class="title">{{ title }}</div>
    <div class="info">{{ info }}</div>
  </div>
</template>

<script>
  export default {
    name: 'secNavbar',
    data() {
      return {
        title: '学校目录',
        info: '根据标签筛选目标院校',
      }
    },
    methods: {
      // 根据 vuex中 navbarId 确定对应text
      changeText() {
        if (this.$store.state.navbarId === 2) {
          this.title = '学校目录'
          this.info = '根据【院校所在地区】及【院校标签】筛选'
        } else if (this.$store.state.navbarId === 3) {
          this.title = '专业目录'
          this.info = '根据【院校名称】及【招生专业】筛选'
        } else if (this.$store.state.navbarId === 4) {
          this.title = '科目目录'
          this.info = '根据【院校考试科目】及【院校标签】筛选'
        }else if (this.$store.state.navbarId === 5) {
          this.title = '真题资料'
          this.info = '搜索你想要的【历年真题】及【复习资料】'
        }
      },
    },
    mounted() {
      // 不能在mounted中实现，因为点击标签之后路由先改变
      // vuex在挂在完毕后，才改变(点击事件比优先级很低？)
      // 即渲染快了，渲染完成了，才触发vuex的修改函数（用的是上次一的数据）
      // this.changeText()
    },
    watch: {
      // 监听vuex 中navbarId 以确定对应text （已用beforeMount实现）
      '$store.state.navbarId': {
        handler() {
          this.changeText()
        },
        // 立即先去执行handler方法
        immediate: true,
      },
    },
  }
</script>

<style scoped>
  .secNavbar {
    height: 70px;
    border-bottom: 2px solid #409eff; 
  }
  .title {
    margin-left: 20px;
    height: 100%;
    line-height: 70px;
    font-size: 30px;
    font-weight: bolder;
    display: inline-block;
  }
  .info {
    line-height: 70px;
    display: inline-block;
    margin-left: 20px;
  }
</style>
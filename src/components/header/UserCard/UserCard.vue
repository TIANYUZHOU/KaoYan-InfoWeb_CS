<template>
  <div v-if="this.$store.state.isLogin" class="button-right">
    <a-popover
      v-model="visible"
      :title="this.$store.state.userInfo.username + ' 的账户'"
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
                @click="route"
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
          <a-button type="danger" shape="round" @click="logout">
            退出
          </a-button>
        </div>
      </template>
      <a-button type="link" shape="circle">
        <a-avatar :src="this.$store.state.userInfo.avatar" icon="user" />
      </a-button>
    </a-popover>
  </div>
</template>

<script>
  export default {
    name: 'UserCard',
    data() {
      return {
        visible: false, // 头像气泡卡片配置
      }
    },
    methods: {
      // 改变vuex 中的 isLogin
      changeLoginState(bool) {
        this.$store.commit('ChangeLoginState', bool)
      },
      logout() {
        window.localStorage.clear()
        // this.$store.state.isLogin = false
        this.changeLoginState(false)
      },
      route(){
        this.$router.push('/userProfile')
      }
    },
  }
</script>

<style scoped>
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
  .button-right {
    float: right;
    margin-right: 30px;
  }
</style>
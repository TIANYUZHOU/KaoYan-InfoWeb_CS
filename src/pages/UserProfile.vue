<template>
  <div id="father">
    <div id="son1">
      <a-card :hoverable="true" style="height: 100%">
        <img
          slot="cover"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="setting" />
          <a-icon key="edit" type="edit" />
          <a-icon key="ellipsis" type="ellipsis" />
        </template>
        <a-card-meta
          :title="userProfile.username"
          :description="userProfile.mobile"
        >
          <a-avatar slot="avatar" :src="this.$store.state.userInfo.avatar" />
        </a-card-meta>
      </a-card>
    </div>
    <div id="son2">
      <a-card
        title="个人设置"
        :hoverable="true"
        type="inner"
        style="height: 100%"
        :bordered="true"
      >
        <a slot="extra">修改</a>
        <a-descriptions title="基本信息" layout="vertical">
          <a-descriptions-item label="用户名">
            {{ userProfile.username }}
          </a-descriptions-item>
          <a-descriptions-item label="手机号">
            {{ userProfile.mobile }}
          </a-descriptions-item>
          <a-descriptions-item label="邮箱">
            {{ userProfile.email }}
          </a-descriptions-item>
          <a-descriptions-item label="上次登录">
            {{ userProfile.last_login }}
          </a-descriptions-item>
          <a-descriptions-item label="加入时间">
            {{ userProfile.date_joined }}
          </a-descriptions-item>
          <a-descriptions-item label="上次编辑">
            {{ userProfile.editTime }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'UserProfile',
    data() {
      return {
        userProfile: {},
      }
    },
    mounted() {
      this.getUserProfile()
    },
    methods: {
      // 获取用户信息
      getUserProfile() {
        let user_id = localStorage.getItem('user_id')
        if (!user_id) {
          return
        }
        let url = 'http://127.0.0.1:8000/userprofile/' + user_id + '/'
        axios.get(url).then((res) => {
          // console.log(res.data)
          this.userProfile = { ...res.data }
        })
      },
    },
  }
</script>

<style scoped>
  #father {
    margin: 100px auto;
    display: flex;
    width: 80%;
  }
  #son1 {
    flex: 1;
  }
  #son2 {
    flex: 4;
  }
</style>
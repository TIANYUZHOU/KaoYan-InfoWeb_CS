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
                @click="route"
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
                @click="feedback"
              />
            </a-tooltip>
            <a-modal
              title="意见反馈"
              :visible="feedbackVisible"
              :confirm-loading="confirmLoading"
              ok-text="提交"
              cancel-text="取消"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <p><a-badge status="processing" />我要反馈：</p>
              <a-textarea
                v-model="feedbackText"
                placeholder="请输入您的意见或建议......"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-modal>
          </div>
          <div>
            <a-tooltip>
              <template slot="title"> 关于 </template>
              <a-button
                style="background-color: #233142; border-color: #233142"
                type="primary"
                shape="circle"
                icon="idcard"
                @click="info"
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
  import axios from 'axios'
  export default {
    name: 'UserCard',
    data() {
      return {
        visible: false, // 头像气泡卡片配置

        // 意见反馈配置
        feedbackVisible: false,
        confirmLoading: false,
        feedbackText: '',
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
        this.$router.push('/')
        this.$store.state.userInfo.token = ''
      },
      route() {
        this.$router.push('/userProfile')
      },
      // 意见反馈配置
      feedback() {
        this.feedbackVisible = true
      },
      handleOk() {
        this.confirmLoading = true
        if (this.feedbackText !== '') {
          const parameter = {
            content: this.feedbackText,
            user: this.$store.state.userInfo.user_id,
          }
          let url = 'http://127.0.0.1:8000/api/feedback/'
          axios.post(url, parameter).then((res) => {
            alert(
              '感谢您的反馈!!\n------------------------------\n' +
                res.data.content
            )
          })
        } else {
          alert('请先输入内容再提交!')
        }
        setTimeout(() => {
          this.feedbackVisible = false
          this.confirmLoading = false
        }, 2000)
      },
      handleCancel() {
        this.feedbackVisible = false
      },
      // 关于
      info() {
        const h = this.$createElement
        this.$info({
          title: '此网站的相关信息',
          okText: '知道了',
          content: h('div', {}, [
            h('p', '版本：1.0'),
            h('p', '作者：TIANYUZHOU'),
          ]),
          onOk() {},
        })
      },
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
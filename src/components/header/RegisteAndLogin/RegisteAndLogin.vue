<template>
  <div v-if="!this.$store.state.isLogin" class="button-right">
    <a-space>
      <a-button
        type="primary"
        shape="round"
        size="large"
        @click="showModalRegiste"
      >
        注册
      </a-button>
      <a-button
        type="danger"
        shape="round"
        size="large"
        @click="showModalLogin"
      >
        登录
      </a-button>
      <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel"
        ><a-card
          style="width: 100%"
          :bordered="false"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="(key) => onTabChange(key, 'noTitleKey')"
        >
          <!--注册表单-->
          <template v-if="noTitleKey === 'registe'">
            <br />
            <a-form-model
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              v-bind="layout"
            >
              <a-form-model-item has-feedback label="用户名" prop="name">
                <a-input v-model="ruleForm.name" placeholder="请输入用户名（4-16个字符）"
                  ><a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0, 0, 0, 0.25)"
                /></a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback label="密码" prop="pass">
                <a-input
                  v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  ><a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                /></a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback label="确认密码" prop="checkPass">
                <a-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                  placeholder="请再次输入密码"
                  ><a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                /></a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback label="手机号" prop="mobile">
                <a-input
                  autocomplete="true"
                  v-model="ruleForm.mobile"
                  placeholder="请输入手机号"
                  ><a-icon
                    slot="prefix"
                    type="mobile"
                    style="color: rgba(0, 0, 0, 0.25)"
                /></a-input>
              </a-form-model-item>
              <a-form-model-item label="验证码" :wrapper-col="{ span: 8 }">
                <a-input v-model="ruleForm.code" placeholder="请输入验证码"
                  ><a-icon
                    slot="prefix"
                    type="loading"
                    style="color: rgba(0, 0, 0, 0.25)"
                /></a-input>
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 4, offset: 4 }">
                <a-button
                  type="primary"
                  :disabled="this.disabled"
                  @click="sendcode"
                >
                  {{ this.btntxt }}
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </template>
          <!--登录表单-->
          <template v-if="noTitleKey === 'login'">
            <br />
            <a-form-model
              ref="ruleFormLogin"
              :model="ruleFormLogin"
              :rules="rulesLogin"
              v-bind="layoutLogin"
            >
              <a-button
                style="float: right; margin-right: -20px; margin-top: -40px"
                type="danger"
                size="small"
                @click="changeLoginType"
              >
                切换登录方式
                <a-icon type="right" />
              </a-button>
              <!-- 验证码登录 -->
              <div v-if="this.isMobile">
                <a-form-model-item
                  has-feedback
                  label="手机号"
                  prop="mobileLogin"
                >
                  <a-input
                    autocomplete="true"
                    v-model="ruleFormLogin.mobileLogin"
                    placeholder="请输入手机号"
                    ><a-icon
                      slot="prefix"
                      type="mobile"
                      style="color: rgba(0, 0, 0, 0.25)"
                  /></a-input>
                </a-form-model-item>
                <a-form-model-item label="验证码" :wrapper-col="{ span: 8 }">
                  <a-input
                    v-model="ruleFormLogin.codeLogin"
                    placeholder="请输入验证码"
                    ><a-icon
                      slot="prefix"
                      type="loading"
                      style="color: rgba(0, 0, 0, 0.25)"
                  /></a-input>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 4, offset: 4 }">
                  <a-button
                    type="primary"
                    :disabled="this.disabledLogin"
                    @click="sendcodeLogin"
                  >
                    {{ this.btntxtLogin }}
                  </a-button>
                </a-form-model-item>
              </div>
              <!-- 用户名密码登录 -->
              <div v-if="!this.isMobile">
                <a-form-model-item has-feedback label="用户名" prop="nameLogin">
                  <a-input
                    v-model="ruleFormLogin.nameLogin"
                    placeholder="输入用户名或手机号"
                  >
                    <a-icon
                      slot="prefix"
                      type="user"
                      style="color: rgba(0, 0, 0, 0.25)"
                    />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item has-feedback label="密码" prop="passLogin">
                  <a-input
                    v-model="ruleFormLogin.passLogin"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    ><a-icon
                      slot="prefix"
                      type="lock"
                      style="color: rgba(0, 0, 0, 0.25)"
                  /></a-input>
                </a-form-model-item>
              </div>
            </a-form-model>
          </template>
        </a-card>
        <!-- 弹出框下方按钮-注册 -->
        <template v-if="this.noTitleKey === 'registe'" slot="footer">
          <a-button key="back" @click="resetForm('ruleForm')"> 重置 </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="submitForm('ruleForm')"
          >
            提交
          </a-button>
        </template>
        <!-- 弹出框下方按钮-登录 -->
        <template v-if="this.noTitleKey === 'login'" slot="footer">
          <a-button
            key="login"
            type="primary"
            :loading="loading"
            @click="submitForm('ruleFormLogin')"
          >
            登录
          </a-button>
        </template>
      </a-modal>
    </a-space>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'RegisteAndLogin',
    data() {
      // 表单配置
      let validatePass = (rule, value, callback) => {
        let userPassPattern = /\S{6,}/
        if (!userPassPattern.test(value)) {
          callback(new Error('请输入6位以上的密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不匹配'))
        } else {
          callback()
        }
      }
      let validateName = (rule, value, callback) => {
        let userNamePattern = /^[a-zA-Z0-9_\-.@]{4,16}$/
        if (!userNamePattern.test(value)) {
          callback(new Error(`请输入正确的用户名（可包含：英文字母、数字、'-'、'_'、'@'、'.'）`))
        } else {
          callback()
        }
      }
      let validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }

      let validateNameLogin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }

      let validatePassLogin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          // if (this.ruleForm.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass')
          // }
          callback()
        }
      }

      let validateMobileLogin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        confirmLoading: false,

        // 卡片配置

        tabListNoTitle: [
          {
            key: 'registe',
            tab: '注册',
          },
          {
            key: 'login',
            tab: '登录',
          },
        ],
        noTitleKey: 'login',
        loading: false,

        // 表单配置

        // 注册表单
        ruleForm: {
          code: '',
          pass: '',
          checkPass: '',
          mobile: '',
          name: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
          name: [{ validator: validateName, trigger: 'change' }],
          mobile: [{ validator: validateMobile, trigger: 'change' }],
        },
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 16 },
        },

        // 登录表单
        ruleFormLogin: {
          codeLogin: '',
          nameLogin: '',
          passLogin: '',
          mobileLogin: '',
        },
        rulesLogin: {
          nameLogin: [{ validator: validateNameLogin, trigger: 'change' }],
          mobileLogin: [{ validator: validateMobileLogin, trigger: 'change' }],
          passLogin: [{ validator: validatePassLogin, trigger: 'change' }],
        },
        layoutLogin: {
          labelCol: { span: 4 },
          wrapperCol: { span: 16 },
        },
        // 自定义表单配置
        // 登录方式
        isMobile: true,

        // 获取验证码按钮
        btntxt: '获取验证码',
        disabled: false,
        time: 0,
        mobiledata: {}, // 返回的数据
        btntxtLogin: '获取验证码',
        disabledLogin: false,
        timeLogin: 0,
        mobiledataLogin: {}, // 返回的数据
      }
    },
    methods: {
      // 改变vuex 中的 isLogin
      changeLoginState(bool) {
        this.$store.commit('ChangeLoginState', bool)
      },
      // 将用户信息写入vuex
      addUserInfo(user) {
        this.$store.commit('AddUserInfo', user)
      },
      // 登录/注册的对话框配置
      showModalRegiste() {
        this.visible = true
        this.noTitleKey = 'registe'
      },
      showModalLogin() {
        this.visible = true
        this.noTitleKey = 'login'
      },
      handleOk() {
        this.ModalText = '对话框两秒后关闭！'
        this.loading = true
        setTimeout(() => {
          this.visible = false
          this.loading = false
        }, 2000)
      },
      handleCancel() {
        // console.log('点击取消按钮')
        this.visible = false
      },
      // 卡片配置
      onTabChange(key, type) {
        // 清除表单校验结果
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.clearValidate()
        }
        if (this.$refs.ruleFormLogin) {
          this.$refs.ruleFormLogin.clearValidate()
        }
        // console.log(key, type)
        this[type] = key
      },
      // 表单配置
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 注册表单提交
            if (formName === 'ruleForm') {
              // console.log(this.ruleForm)
              let data = {
                username: this.ruleForm.name,
                password: this.ruleForm.pass,
                mobile: this.ruleForm.mobile,
                sms_code: this.ruleForm.code,
              }
              let url = 'http://127.0.0.1:8000/users/'
              axios
                .post(url, data)
                .then(() => {
                  // console.log(res.data)
                  this.handleOk() // 对话框原有方法触发
                  alert('注册成功!')
                })
                .catch((e) => {
                  if (e.response.data.non_field_errors) {
                    alert('验证码错误！')
                  } else if (e.response.data.mobile) {
                    alert('手机号为：' + data.mobile + '的用户已存在')
                  }
                  // console.log(e.response.data)
                })
            }
            // 登录表单提交
            else if (formName === 'ruleFormLogin') {
              let data = {
                username: '',
                password: '',
              }
              // 登录需要的用户信息
              // 用户名或电话 都通过username字段传给后端
              // 密码或验证码 都通过passwor字段传给后端
              if (this.isMobile) {
                data.username = this.ruleFormLogin.mobileLogin
                data.password = this.ruleFormLogin.codeLogin
              } else {
                data.username = this.ruleFormLogin.nameLogin
                data.password = this.ruleFormLogin.passLogin
              }
              let url = 'http://127.0.0.1:8000/login/'
              axios
                .post(url, data)
                .then((res) => {
                  // console.log(res.data)
                  if (res.data.error) {
                    alert(res.data.message)
                  } else {
                    localStorage.user_id = res.data.user_id
                    localStorage.username = res.data.username
                    localStorage.avatar = res.data.avatar
                    localStorage.token = res.data.access
                    localStorage.colId = res.data.colId
                    // console.log(res.data)
                    localStorage.schIdList = res.data.schIdList
                    // this.$store.state.isLogin = true
                    this.addUserInfo(res.data)
                    this.changeLoginState(true)
                    this.handleOk() // 对话框原有方法触发
                  }
                })
                .catch((e) => {
                  // console.log(e.response.data)
                  // console.log(e)
                  alert(e)
                })
            }
          } else {
            // console.log('提交失败!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 自定义表单配置
      changeLoginType() {
        this.isMobile = !this.isMobile
        // 清除表单校验结果
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.clearValidate()
        }
        if (this.$refs.ruleFormLogin) {
          this.$refs.ruleFormLogin.clearValidate()
        }
      },

      // 验证码按钮
      //验证手机号码部分
      sendcode: function () {
        let url = ' http://127.0.0.1:8000/sms_code/' + this.ruleForm.mobile
        if (this.ruleForm.mobile == '') {
          alert('请输入手机号码')
          return
        } else if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.ruleForm.mobile)) {
          return
        }
        this.time = 35
        this.disabled = true
        this.timer()
        axios.get(url).then((res) => {
          this.mobiledata = res.data
          // console.log(this.mobiledata)
          alert(this.mobiledata.SendStatusSet[0].Message)
        })
      },
      sendcodeLogin: function () {
        let url =
          ' http://127.0.0.1:8000/sms_code/' + this.ruleFormLogin.mobileLogin
        if (this.ruleFormLogin.mobileLogin == '') {
          alert('请输入手机号码')
          return
        } else if (
          !/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.ruleFormLogin.mobileLogin)
        ) {
          return
        }
        this.timeLogin = 35
        this.disabledLogin = true
        this.timerLogin()
        axios.get(url).then((res) => {
          this.mobiledataLogin = res.data
          // console.log(this.mobiledata)
          alert(this.mobiledataLogin.SendStatusSet[0].Message)
        })
      },
      timer: function () {
        if (this.time > 0) {
          this.time--
          this.btntxt = this.time + 's,后重新发送'
          setTimeout(this.timer, 1000)
        } else {
          this.time = 0
          this.btntxt = '获取验证码'
          this.disabled = false
        }
      },
      timerLogin: function () {
        if (this.timeLogin > 0) {
          this.timeLogin--
          this.btntxtLogin = this.timeLogin + 's,后重新发送'
          setTimeout(this.timerLogin, 1000)
        } else {
          this.timeLogin = 0
          this.btntxtLogin = '获取验证码'
          this.disabledLogin = false
        }
      },
    },
  }
</script>

<style scoped>
  .button-right {
    float: right;
    margin-right: 30px;
  }
</style>
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
                  <a-input v-model="ruleForm.name" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="密码" prop="pass">
                  <a-input
                    v-model="ruleForm.pass"
                    type="password"
                    autocomplete="off"
                  />
                </a-form-model-item>
                <a-form-model-item
                  has-feedback
                  label="确认密码"
                  prop="checkPass"
                >
                  <a-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                  />
                </a-form-model-item>
                <a-form-model-item has-feedback label="手机号" prop="mobile">
                  <a-input autocomplete="true" v-model="ruleForm.mobile" />
                </a-form-model-item>
                <a-form-model-item label="验证码" :wrapper-col="{ span: 8 }">
                  <a-input v-model="ruleForm.code" />
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
                    />
                  </a-form-model-item>
                  <a-form-model-item label="验证码" :wrapper-col="{ span: 8 }">
                    <a-input v-model="ruleFormLogin.codeLogin" />
                  </a-form-model-item>
                  <a-form-model-item :wrapper-col="{ span: 4, offset: 4 }">
                    <a-button type="primary"> 获取验证码 </a-button>
                  </a-form-model-item>
                </div>
                <!-- 用户名密码登录 -->
                <div v-if="!this.isMobile">
                  <a-form-model-item
                    has-feedback
                    label="用户名"
                    prop="nameLogin"
                  >
                    <a-input
                      v-model="ruleFormLogin.nameLogin"
                      placeholder="请填写用户名或手机号"
                    />
                  </a-form-model-item>
                  <a-form-model-item has-feedback label="密码" prop="passLogin">
                    <a-input
                      v-model="ruleFormLogin.passLogin"
                      type="password"
                      autocomplete="off"
                    />
                  </a-form-model-item>
                </div>
              </a-form-model>
            </template>
          </a-card>
          <!-- 弹出框下方按钮-注册 -->
          <template v-if="this.noTitleKey === 'registe'" slot="footer">
            <a-button key="back" @click="resetForm('ruleForm')">
              重置
            </a-button>
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
        <a-button type="link" shape="circle">
          <a-avatar
            src="https://assets.leetcode-cn.com/aliyun-lc-upload/users/shu-sheng-40/avatar_1581912063.png"
            icon="user"
          />
        </a-button>
      </a-popover>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Navbar',
    data() {
      // 表单配置
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
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
        if (value === '') {
          callback(new Error('请输入用户名'))
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
        visible: false, // 头像气泡卡片配置
        userName: 'TIANYUZHO',

        // 登录/注册 对话框配置
        // ModalText: 'Content of the modal',
        // visible: false,
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
      }
    },
    methods: {
      // 改变vuex 中Navbar的id
      changeNavId(id) {
        this.$store.commit('ChangeNavId', id)
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
        console.log('点击取消按钮')
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
        console.log(key, type)
        this[type] = key
      },
      // 表单配置
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleOk() // 对话框原有方法触发
            alert('提交成功!')
          } else {
            console.log('提交失败!!')
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
        }else if(!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.ruleForm.mobile)){
          return
        }
        this.time = 35
        this.disabled = true
        this.timer()
        axios
          .get(url)
          .then((res) => {
            this.mobiledata = res.data
            // console.log(this.mobiledata)
            alert(this.mobiledata.SendStatusSet[0].Message)
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
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
        <a-button type="primary" shape="round" size="large" @click="showModal">
          注册
        </a-button>
        <a-button type="danger" shape="round" size="large" @click="showModal">
          登录
        </a-button>
        <a-modal
          title="注册/登录"
          :visible="visible"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <!-- 表单 -->
          <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
          >
            <a-form-model-item has-feedback label="Password" prop="pass">
              <a-input
                v-model="ruleForm.pass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Confirm" prop="checkPass">
              <a-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Age" prop="age">
              <a-input v-model.number="ruleForm.age" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <!-- <a-button type="primary" @click="submitForm('ruleForm')">
                Submit
              </a-button>
              <a-button
                style="margin-left: 10px"
                @click="resetForm('ruleForm')"
              >
                Reset
              </a-button> -->
            </a-form-model-item>
          </a-form-model>
          <template slot="footer">
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
  export default {
    name: 'Navbar',
    data() {
      // 表单配置
      let checkPending
      let checkAge = (rule, value, callback) => {
        clearTimeout(checkPending)
        if (!value) {
          return callback(new Error('Please input the age'))
        }
        checkPending = setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("Two inputs don't match!"))
        } else {
          callback()
        }
      }
      return {
        visible: false, // 头像气泡卡片配置
        userName: 'TIANYUZHO',

        // 登录/注册 对话框配置
        ModalText: 'Content of the modal',
        // visible: false,
        confirmLoading: false,

        // 表单配置
        loading: false,
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
          age: [{ validator: checkAge, trigger: 'change' }],
        },
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
      }
    },
    methods: {
      // 改变vuex 中Navbar的id
      changeNavId(id) {
        this.$store.commit('ChangeNavId', id)
      },
      // 登录/注册的对话框配置
      showModal() {
        this.visible = true
      },
      handleOk() {
        this.ModalText = 'The modal will be closed after two seconds'
        this.loading = true;
        setTimeout(() => {
          this.visible = false
          this.loading = false
        }, 2000)
      },
      handleCancel() {
        console.log('Clicked cancel button')
        this.visible = false
      },

      // 表单配置
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleOk() // 对话框原有方法触发
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
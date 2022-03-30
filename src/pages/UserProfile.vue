<template>
  <div>
    <div id="father">
      <div id="son1">
        <a-card :hoverable="true" style="height: 100%">
          <img
            slot="cover"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <template v-if="isModify" slot="actions" class="ant-card-actions">
            <a-input v-model="signature" placeholder="请输入修改的签名"
              ><a-icon
                slot="prefix"
                type="edit"
                style="color: rgba(0, 0, 0, 0.25)"
            /></a-input>
          </template>
          <a-card-meta
            :title="userProfile.username"
            :description="'签名：' + signature"
          >
            <a-avatar slot="avatar" :src="this.avatar" />
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
          <a slot="extra" v-if="!isModify" @click="changeisModify">修改</a>
          <a slot="extra" v-if="isModify" @click="changeisModify">取消</a>
          <a-descriptions title="基本信息" layout="vertical">
            <a-descriptions-item v-if="!isModify" label="用户名">
              {{ userProfile.username }}
            </a-descriptions-item>
            <a-descriptions-item v-if="isModify" label="修改用户名">
              <a-input v-model="username" placeholder="请输入修改的用户名"
                ><a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
              /></a-input>
            </a-descriptions-item>
            <a-descriptions-item v-if="!isModify" label="手机号">
              {{ userProfile.mobile }}
            </a-descriptions-item>
            <a-descriptions-item v-if="isModify" label="修改手机号">
              <a-input v-model="mobile" placeholder="请输入修改的手机号"
                ><a-icon
                  slot="prefix"
                  type="mobile"
                  style="color: rgba(0, 0, 0, 0.25)"
              /></a-input>
            </a-descriptions-item>
            <a-descriptions-item v-if="!isModify" label="邮箱">
              {{ userProfile.email }}
            </a-descriptions-item>
            <a-descriptions-item v-if="isModify" label="修改邮箱">
              <a-input v-model="email" placeholder="请输入修改的邮箱号"
                ><a-icon
                  slot="prefix"
                  type="mail"
                  style="color: rgba(0, 0, 0, 0.25)"
              /></a-input>
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
      <div v-if="isModify" id="son3">
        <a-card type="inner" :hoverable="true" style="height: 100%">
          <div class="item_bock head_p">
            <div class="head_img">
              <img :src="this.preAvtar" />
            </div>
            <!-- <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="hiddenInput"
            />
            <div class="setting_right" @click.stop="uploadHeadImg">
              <div class="caption">更改头像</div>
            </div> -->
            <a-upload
              id="upload"
              accept=".jpg,.png"
              :remove="handleRemove"
              :before-upload="beforeUpload"
              :headers="headers"
            >
              <a-button> <a-icon type="upload" /> 更换头像 </a-button>
            </a-upload>
          </div>
        </a-card>
      </div>
    </div>
    <div v-if="isModify" id="submit">
      <a-button type="primary" style="width: 100%" @click="submit">
        提交修改
      </a-button>
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
        isModify: false,
        email: '',
        signature: '',
        avatar: '',
        preAvtar: '',
        username: '',
        mobile: '',
        // 上传头像配置
        fileList: [],
        defaultFileList:[],
        headers: {
          authorization: 'authorization-text',
        },
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
          let { avatar, email, signature, username, mobile } = res.data
          this.email = email
          ;(this.avatar = avatar),
            (this.signature = signature),
            (this.username = username),
            (this.mobile = mobile),
            (this.preAvtar = avatar)
        })
      },
      // 改变编辑状态
      changeisModify() {
        this.isModify = !this.isModify
      },
      // 打开图片上传
      // uploadHeadImg: function () {
      //   this.$el.querySelector('.hiddenInput').click()
      // },
      // 将头像显示
      // handleFile: function (e) {
      //   let $target = e.target || e.srcElement
      //   let file = $target.files[0]
      //   let reader = new FileReader()
      //   reader.onload = (data) => {
      //     let res = data.target || data.srcElement
      //     this.avatar = res.result
      //   }
      //   reader.readAsDataURL(file)
      // },

      // 上传头像配置
      beforeUpload(file) {
        if(this.fileList.length!==0){
          this.fileList.length = 0
        }
        this.fileList = [...this.fileList, file]
        let reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.preAvtar = res.result
        }
        reader.readAsDataURL(file)
        // console.log(file)
        return false
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file)
        const newFileList = this.fileList.slice()
        newFileList.splice(index, 1)
        this.fileList = newFileList
      },
      submit() {
        const userInfoFormData = new FormData()
        const { fileList } = this
        fileList.forEach((file) => {
          userInfoFormData.append('avatar', file)
        })
        const userInfoSubmit = {
          email: this.email,
          signature: this.signature,
          username: this.username,
          mobile: this.mobile,
        }
        Object.keys(userInfoSubmit).forEach((value) => {
          userInfoFormData.append(value, userInfoSubmit[value])
        })

        // console.log(userInfoFormData.get('email'))

        // You can use any AJAX library you like
        // reqwest({
        //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //   method: 'post',
        //   processData: false,
        //   data: formData,
        //   success: () => {
        //     this.fileList = [];
        //     this.uploading = false;
        //     this.$message.success('upload successfully.');
        //   },
        //   error: () => {
        //     this.uploading = false;
        //     this.$message.error('upload failed.');
        //   },
        // });
        let user_id = localStorage.getItem('user_id')
        if (!user_id) {
          return
        }
        let url = 'http://127.0.0.1:8000/usermodify/' + user_id + '/'
        axios.put(url, userInfoFormData).then((res) => {
          // console.log(res.data)
          this.$store.commit('AddUserInfo', res.data)
          this.avatar = res.data.avatar
          localStorage.username = res.data.username
          localStorage.avatar = res.data.avatar
          this.isModify = !this.isModify
        })
      },
    },
  }
</script>

<style scoped>
  #father {
    margin: 100px auto;
    margin-bottom: 0px;
    display: flex;
    width: 90%;
    flex-wrap: wrap;
  }
  #son1 {
    flex: 2;
  }
  #son2 {
    flex: 8;
  }
  #son3 {
    flex: 1;
  }
  #submit {
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  /* 修改头像 */
  .item_bock {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    /* height: 94px; */
    /* width: 300px; */
    /* padding: 0px 24px 0px 38px; */
    margin-top: 50%;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }
  .head_p {
    height: 132px;
  }
  .head_img {
    height: 90px;
  }
  .head_img img {
    width: 90px;
    height: 90px;
    border-radius: 50px;
  }
  .setting_right {
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput {
    display: none;
  }
  .caption {
    color: #5e9eff;
    font-size: 16px;
    height: 37px;
  }
</style>
<template>
  <div>
    <sec-navbar></sec-navbar>
    <div class="materials">
      <div class="condition">
        <!-- 条件卡片 -->
        <a-card title="资料分享 >" style="width: 100%">
          <a slot="extra"
            ><a-button type="primary" @click="showModal">
              资料上传
            </a-button></a
          >
          <a-modal
            v-model="visible"
            title="上传资料"
            cancel-text="取消"
            ok-text="确认上传"
            @ok="handleUpload"
            @cancel="handleCancel"
          >
            <a-alert
              v-if="!isError && !isSuccess"
              message="提示"
              description="支持上传 doc / docx / pdf / zip / rar 格式的资料"
              type="info"
              show-icon
            />
            <a-alert
              v-if="isError"
              message="错误"
              :description="errorDescription"
              type="error"
              show-icon
            />
            <a-alert
              v-if="isSuccess"
              message="上传成功"
              description="您的资料已经上传成功！"
              type="success"
              show-icon
            />
            <br />
            <p><a-badge status="processing" /> 所属院校</p>
            <a-input
              ref="schoolNameInput"
              v-model="schoolName"
              placeholder="请输入资料所属学校全称"
              style="width: 50%; margin-right: 45px"
              size="large"
            >
              <a-icon slot="prefix" type="bank"
            /></a-input>
            <p></p>
            <p><a-badge status="processing" /> 资料类别</p>
            <a-select
              default-value="ELSE"
              size="large"
              style="width: 50%"
              @change="handleSelect"
              ><a-select-option value="MATH"> 数学 </a-select-option>
              <a-select-option value="EN"> 英语 </a-select-option>
              <a-select-option value="POL"> 政治 </a-select-option>
              <a-select-option value="PUCC"> 公共课资料 </a-select-option>
              <a-select-option value="408"> 408 </a-select-option>
              <a-select-option value="DS"> 数据结构 </a-select-option>
              <a-select-option value="OS"> 操作系统 </a-select-option>
              <a-select-option value="CN"> 计算机网络 </a-select-option>
              <a-select-option value="CO"> 计算机组成原理 </a-select-option>
              <a-select-option value="PRCC"> 专业课资料 </a-select-option>
              <a-select-option value="ELSE"> 其他 </a-select-option>
            </a-select>
            <p></p>
            <p><a-badge status="processing" /> 描述信息</p>
            <a-textarea
              v-model="description"
              placeholder="请输入资料的描述信息......"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
            <p></p>
            <a-upload
              accept=".doc,.docx,.pdf,.rar,.zip"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :remove="handleRemove"
            >
              <a-button size="large">
                <a-icon type="upload" /> 点击上传
              </a-button>
            </a-upload>
          </a-modal>
          <a-card style="width: 100%">
            <!-- 搜索框 -->
            <div style="width: 100%">
              <a-input-search
                placeholder="请输入【资料名称】 / 【资料所属学校】 进行搜索"
                enter-button
                @search="onSearch"
                size="large"
                v-model="searchContent"
              />
            </div>
            <br />
            <!-- 多选框 -->
            <div>
              <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox
                  :indeterminate="indeterminate"
                  :checked="checkAll"
                  @change="onCheckAllChange"
                >
                  全选
                </a-checkbox>
              </div>
              <br />
              <a-checkbox-group
                v-model="checkedList"
                :options="plainOptions"
                @change="onChange"
              />
              <div style="display: inline; margin-left: 20px">
                <a-button
                  style="height: 35px"
                  type="primary"
                  @click="submitCheckBox"
                  >确认
                </a-button>
              </div>
            </div>
          </a-card>
        </a-card>
      </div>
      <!-- 资料表格 -->
      <div class="materialsTable">
        <a-table :columns="columns" :data-source="matData">
          <span slot="customTitle"><a-icon type="crown" />资料名称 </span>
          <span slot="matName" slot-scope="text, record">
            <a :href="record.link">{{ record.matName }}</a>
          </span>
          <span slot="downloads" slot-scope="text, record">
            {{ record.downloads }}
          </span>
          <span slot="link" slot-scope="text, record">
            <a :href="record.link">点击下载</a>
          </span>
          <span slot="size" slot-scope="text, record">
            <a-tag color="#f50">{{ record.size }} </a-tag>
          </span>
          <span slot="uploadTime" slot-scope="text, record">
            <a-tag color="blue">{{ record.uploadTime.split('T')[0] }} </a-tag>
          </span>

          <!-- <span slot="type"> </span>
          <span slot="uploadTime"> </span>
          <span slot="uploadUser"> </span>
          <span slot="link"> </span> -->
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
  import myAxios from '@/utils/axios'
  // 导入标题卡片导航
  import secNavbar from './pubChildren/secNavbar.vue'
  // 多选框参数
  const plainOptions = [
    '数学',
    '英语',
    '政治',
    '408',
    '数据结构',
    '操作系统',
    '计算机网络',
    '计算机组成原理',
    '公共课资料',
    '专业课资料',
    '其他',
  ]
  const defaultCheckedList = ['数学', '408']
  // 资料表格配置
  // 筛选后学校表格
  const columns = [
    {
      dataIndex: 'matName',
      key: 'matName',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'matName' },
      width: 200,
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      scopedSlots: { customRender: 'size' },
    },
    {
      title: '文件描述',
      key: 'description',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' },
    },
    {
      title: '所属学校',
      dataIndex: 'schName',
      key: 'schName',
    },
    {
      title: '上传用户',
      key: 'uploadUser',
      dataIndex: 'uploadUser',
    },
    {
      title: '上传时间',
      key: 'uploadTime',
      dataIndex: 'uploadTime',
      scopedSlots: { customRender: 'uploadTime' },
    },
    {
      title: '下载量',
      key: 'downloads',
      scopedSlots: { customRender: 'downloads' },
    },
    {
      title: '下载链接',
      key: 'link',
      scopedSlots: { customRender: 'link' },
    },
  ]
  // 筛选后学校表格数据
  const matData = []
  export default {
    components: { secNavbar },
    data() {
      return {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        plainOptions,
        columns,
        matData,

        // 上传资料对话框配置
        visible: false,

        // 上传组件配置
        schoolName: '',
        materialClass: '',
        description: '',
        headers: {
          authorization: 'authorization-text',
        },
        fileList: [],
        // 上传提示
        errorDescription: '',
        isError: false,
        isSuccess: false,

        // 搜索框
        searchContent: '',
      }
    },
    mounted() {
      this.submitCheckBox()
    },
    methods: {
      onChange(checkedList) {
        this.indeterminate =
          !!checkedList.length && checkedList.length < plainOptions.length
        this.checkAll = checkedList.length === plainOptions.length
        // console.log(this.checkedList)
      },
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        })
        // console.log(this.checkedList)
      },
      submitCheckBox() {
        matData.splice(0)
        let url = []
        let baseUrl = 'http://127.0.0.1:8000/api/materialInfo/'
        if (this.checkedList.length === 0) {
          // url = [baseUrl]
        } else {
          let map = {
            数学: 'MATH',
            英语: 'EN',
            政治: 'POL',
            公共课资料: 'PUCC',
            408: '408',
            数据结构: 'DS',
            操作系统: 'OS',
            计算机网络: 'CN',
            计算机组成原理: 'CO',
            专业课资料: 'PRCC',
            其他: 'ELSE',
          }
          const submitCheckedList = this.checkedList.map((item) => map[item])
          // console.log(submitCheckedList)
          // debugger
          submitCheckedList.forEach((value) => {
            url.push(baseUrl + '?matClass=' + value)
          })
        }
        let key = 1
        url.forEach((value) => {
          myAxios
            .get(value)
            .then((res) => {
              if (res.data.results.length !== 0) {
                res.data.results.forEach((value) => {
                  const materialData = {
                    key: key++,
                    matName: value.matName,
                    description: value.description,
                    size:
                      value.fileSize / 1024 / 1024 > 1
                        ? (value.fileSize / 1024 / 1024).toFixed(2) + '   M'
                        : (value.fileSize / 1024).toFixed(0) + '   KB',
                    schName: value.school.schName,
                    uploadTime: value.uploadTime,
                    uploadUser: value.user.username,
                    downloads: value.downloads,
                    link:
                      'http://127.0.0.1:8000/api/materials/' +
                      value.id +
                      '/download',
                  }
                  matData.push(materialData)
                  // console.log(res.data.results[0].matName)
                })
              }
            })
            .catch((e) => {
              alert(e)
            })
        })

        // axios
        //   .get(url)
        //   .then((res) => {
        //     console.log(res.data)
        //   })
        //   .catch((e) => {})
      },
      onSearch(value) {
        if (value === '') {
          return
        }
        matData.splice(0)
        let url = 'http://127.0.0.1:8000/api/materialInfo/?search=' + value
        let key = 1
        myAxios
          .get(url)
          .then((res) => {
            {
              let results = res.data.results
              if (results.length !== 0) {
                results.forEach((value) => {
                  const materialData = {
                    key: key++,
                    matName: value.matName,
                    description: value.description,
                    size:
                      value.fileSize / 1024 / 1024 > 1
                        ? (value.fileSize / 1024 / 1024).toFixed(2) + '   M'
                        : (value.fileSize / 1024).toFixed(0) + '   KB',
                    schName: value.school.schName,
                    uploadTime: value.uploadTime,
                    uploadUser: value.user.username,
                    downloads: value.downloads,
                    link:
                      'http://127.0.0.1:8000/api/materials/' +
                      value.id +
                      '/download',
                  }
                  matData.push(materialData)
                  // console.log(res.data.results[0].matName)
                })
              }
            }
          })
          .catch((e) => {
            alert(e)
          })
      },
      // 上传资料对话框配置
      showModal() {
        if (!this.$store.state.userInfo.token) {
          alert('请先登录再执行此操作!')
          this.$store.state.navbarId = 1
          this.$router.push('/')
          return
        }
        this.visible = true
      },
      handleCancel() {
        setTimeout(() => {
          this.isError = false
        }, 1000)
      },
      handleUpload() {
        const { fileList } = this
        let user_id = localStorage.getItem('user_id')
        if (!user_id) {
          return
        }
        if (this.schoolName === '') {
          this.schoolName = '所有院校'
        }
        const formData = new FormData()
        fileList.forEach((file) => {
          formData.append('file', file)
          formData.append('matName', file.name)
          formData.append('user', user_id)
          formData.append('school', this.schoolName)
          formData.append('fileSize', file.size)
          formData.append('matClass', this.materialClass)
          formData.append('description', this.description)
        })
        let url = 'http://127.0.0.1:8000/api/materials/'
        myAxios
          .post(url, formData)
          .then(() => {
            // console.log(res.data)
            setTimeout(() => {
              this.visible = false
            }, 2000)
            this.isError = false
            this.isSuccess = true
          })
          .catch((e) => {
            // alert(e + '\n请检查学校名称是否正确！')
            this.errorDescription =
              e + '\n请检查学校名称是否正确！资料是否正确上传!'
            this.isError = true
          })
      },
      // 上传组件配置
      beforeUpload(file) {
        this.fileList = [...this.fileList, file]
        // console.log(this.fileList)
        this.isError = false
        return false
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file)
        const newFileList = this.fileList.slice()
        newFileList.splice(index, 1)
        this.fileList = newFileList
      },
      handleSelect(value) {
        this.materialClass = value
      },
    },
    watch: {
      schoolName() {
        this.isError = false
      },
      searchContent(newv) {
        // 使用搜索则全选多选框
        if (newv !== '') {
          this.checkedList = plainOptions
          this.indeterminate = false
          this.checkAll = true
        }
      },
    },
  }
</script>

<style scoped>
  .materials {
    margin: 0 40px 0 40px;
  }
  .condition {
    margin-top: 30px;
    /* border: 1px solid #eceaea; */
  }
  .materialsTable {
    margin-top: 30px;
    border: 1px solid #eceaea;
  }
</style>
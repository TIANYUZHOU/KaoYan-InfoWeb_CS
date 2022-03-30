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
            <div style="width: 500px">
              <a-input-search
                placeholder="请输入搜索内容"
                enter-button
                @search="onSearch"
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
            </div>
          </a-card>
        </a-card>
      </div>
      <!-- 资料表格 -->
      <div class="materialsTable">
        <a-table :columns="columns" :data-source="schoolData">
          <span slot="customTitle"><a-icon type="crown" />资料名称 </span>
          <span slot="matName" slot-scope="text, record">
            <a :href="record.link">{{ record.matName }}</a>
          </span>
          <span slot="link" slot-scope="text, record">
            <a :href="record.link">点击下载</a>
          </span>
          <span slot="type" slot-scope="text, record">
            <a-tag color="#2db7f5"
              >{{ record.size + ' ' + record.type }}
            </a-tag>
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
  import axios from 'axios'
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
    },
    {
      title: '文件描述',
      dataIndex: 'type',
      key: 'type',
      scopedSlots: { customRender: 'type' },
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
    },
    {
      title: '下载链接',
      key: 'link',
      scopedSlots: { customRender: 'link' },
    },
  ]
  // 筛选后学校表格数据
  const schoolData = [
    {
      key: '1',
      matName: '2021-408真题.pdf',
      type: 'pdf',
      size: '1.5M',
      schName: '北京大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link: 'https://ztyzhou.com',
    },
    {
      key: '2',
      matName: '2021-四川农业大学数据结构.pdf',
      type: 'pdf',
      size: '1.5M',
      schName: '四川农业大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link: 'https://ztyzhou.com',
    },
    {
      key: '3',
      matName: '2021-新疆大学数据结构.pdf',
      type: 'pdf',
      size: '1.5M',
      schName: '新疆大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link: 'https://ztyzhou.com',
    },
  ]
  export default {
    components: { secNavbar },
    data() {
      return {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        plainOptions,
        columns,
        schoolData,

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
      }
    },
    methods: {
      onChange(checkedList) {
        this.indeterminate =
          !!checkedList.length && checkedList.length < plainOptions.length
        this.checkAll = checkedList.length === plainOptions.length
      },
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        })
      },
      onSearch(value) {
        console.log(value)
      },
      // 上传资料对话框配置
      showModal() {
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
        axios
          .post(url, formData)
          .then((res) => {
            console.log(res.data)
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
        console.log(this.fileList)
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
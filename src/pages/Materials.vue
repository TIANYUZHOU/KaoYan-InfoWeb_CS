<template>
  <div>
    <sec-navbar></sec-navbar>
    <div class="materials">
      <div class="condition">
        <!-- 条件卡片 -->
        <a-card title="资料分享 >" style="width: 100%">
          <a-card style="width: 100%">
            <!-- 搜索框 -->
            <div style="width: 500px">
              <a-input-search
                placeholder="input search text"
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
          <span slot="customTitle"><a-icon type="crown" />资料名称</span>
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
      title: '文件类型',
      dataIndex: 'type',
      key: 'type',
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
      dataIndex: 'link',
      key: 'link',
    },
  ]
  // 筛选后学校表格数据
  const schoolData = [
    {
      key: '1',
      matName: '2021-408真题.pdf',
      type: 'pdf',
      schName: '北京大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link:'https://ztyzhou.com'
    },
    {
      key: '2',
      matName: '2021-四川农业大学数据结构.pdf',
      type: 'pdf',
      schName: '四川农业大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link:'https://ztyzhou.com'
    },
    {
      key: '3',
      matName: '2021-新疆大学数据结构.pdf',
      type: 'pdf',
      schName: '新疆大学',
      uploadTime: '2022-03-21',
      uploadUser: 'ztyzhou',
      link:'https://ztyzhou.com'
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
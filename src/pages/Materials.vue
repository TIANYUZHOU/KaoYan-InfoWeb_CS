<template>
  <div>
    <sec-navbar></sec-navbar>
    <div class="materials">
      <div class="condition">
        <!-- 条件卡片 -->
        <a-card title="资料分享 >" style="width: 100%">
          <a slot="extra" href="#">more</a>
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
  export default {
    components: { secNavbar },
    data() {
      return {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        plainOptions,
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
</style>
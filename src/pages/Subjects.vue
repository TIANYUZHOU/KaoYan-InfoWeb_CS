<template>
  <div>
    <sec-navbar></sec-navbar>
    <div class="subjects">
      <div class="condition">
        <a-card
          :bodyStyle="{ padding: 0, 'padding-top': '1px' }"
          title="科目筛选 >"
        >
          <a-row :gutter="16">
            <a-col :span="12" style="padding-right: 0px; border-right: 1px solid #eceaea">
              <!-- 考试范围卡片 -->
              <a-card
                title="考试范围"
                type="inner"
                :bordered="false"
                :bodyStyle="{ padding: '10px' }"
              >
                <a-card style="width: 100%">
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
            </a-col>
            <a-col
              :span="12"
              style="padding-left: 0px;"
            >
              <!-- 院校标签卡片 -->
              <a-card
                title="院校标签"
                type="inner"
                :bordered="false"
                :bodyStyle="{ padding: '10px' }"
              >
               <a-card style="width: 100%">
                  <!-- 多选框 -->
                  <div>
                    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                      <a-checkbox
                        :indeterminate="indeterminate2"
                        :checked="checkAll2"
                        @change="onCheckAllChange2"
                      >
                        全选
                      </a-checkbox>
                    </div>
                    <br />
                    <a-checkbox-group
                      v-model="checkedList2"
                      :options="plainOptions2"
                      @change="onChange2"
                    />
                  </div>
                  
                </a-card>
              </a-card>
            </a-col>
          </a-row>
          <!-- 卡片事件组件 -->
          <template slot="actions" class="ant-card-actions">
            <a-button type="primary" size="large"
              ><a-icon type="thunderbolt" /> 确认
            </a-button>
          </template>
          <a slot="extra" href="#"
            ><a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                其他筛选 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="routeTo(1)">按学校筛选</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="routeTo(2)">按专业筛选</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown></a
          >
        </a-card>
      </div>
      <div class="shcoolTable">
        <a-table :columns="columns" :data-source="schoolData">
          <a slot="schName" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="fire" />院校名称</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag" :color="tagColor(tag)">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="subReview" slot-scope="text">
            <a-tag color="#f50"> {{ text.subReviewCS }} </a-tag>
            <a-tag color="#2db7f5"> {{ text.subReviewES }} </a-tag>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入标题卡片导航
  import secNavbar from './pubChildren/secNavbar.vue'
  // 筛选后学校表格
  const columns = [
    {
      dataIndex: 'schName',
      key: 'schName',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'schName' },
    },
    {
      title: '地区',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: '隶属单位',
      dataIndex: 'belong',
      key: 'belong',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' },
    },
    {
      title: '学科评估',
      // dataIndex: 'subReview',
      key: 'subReview',
      scopedSlots: { customRender: 'subReview' },
    },
  ]
  // 筛选后学校表格数据
  const schoolData = [
    {
      key: '1',
      schName: '北京大学',
      province: '北京',
      belong: '教育部',
      tags: ['一流大学A类', '985', '211'],
      subReviewCS: '计算机：A+',
      subReviewES: '软件：A+',
    },
    {
      key: '2',
      schName: '四川农业大学',
      province: '四川',
      belong: '四川省',
      tags: ['一流学科', '211'],
      // subReviewCS: '计算机：无',   不写就是一条杠
      // subReviewES: '软件：无',
    },
    {
      key: '3',
      schName: '新疆大学',
      province: '新疆',
      belong: '新疆维吾尔自治区',
      tags: ['一流大学B类', '211'],
      subReviewCS: '计算机：B-',
      subReviewES: '软件：C+',
    },
  ]
  // 多选框1参数
  const plainOptions = ['数学一', '数学二', '英语一','英语二','一门','两门','三门','四门','408']
  const defaultCheckedList = ['数学一','英语一', '408']
  const plainOptions2 = ['985', '211', '一流大学A类','一流大学B类','一流学科','其他']
  const defaultCheckedList2 = ['985', '一流大学A类']
  export default {
    components: { secNavbar },
    name: 'Subjects',
    data() {
      return {
        columns, // 筛选后学校表格
        schoolData, // 筛选后学校数据
        // 多选框参数
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        plainOptions,

        checkedList2: defaultCheckedList2,
        indeterminate2: true,
        checkAll2: false,
        plainOptions2,
      }
    },
    methods: {
      // 卡片下拉栏路由
      routeTo(id) {
        if (id === 1) {
          this.$router.push('/schools')
        } else if (id === 2) {
          this.$router.push('/majoys')
        } else if (id === 3) {
          this.$router.push('/subjects')
          // console.log(id)
        }
      },
      // 计算学校标签颜色
      tagColor(tag) {
        // console.log(tag)
        if (tag === '一流大学A类') {
          return 'volcano'
        } else if (tag === '一流大学B类') {
          return 'orange'
        } else if (tag === '一流学科') {
          return 'green'
        } else if (tag === '985') {
          return 'red'
        } else if (tag === '211') {
          return 'cyan'
        } else {
          return tag.length > 5 ? 'geekblue' : 'purple'
        }
      },
      // 多选框函数
      onChange(checkedList) {
        this.indeterminate =
          !!checkedList.length && checkedList.length < plainOptions.length
        this.checkAll = checkedList.length === plainOptions.length
      },
      // 多选框函数
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        })
      },
      // 多选框函数
      onChange2(checkedList2) {
        this.indeterminate2 =
          !!checkedList2.length && checkedList2.length < plainOptions2.length
        this.checkAll2 = checkedList2.length === plainOptions2.length
      },
      // 多选框函数
      onCheckAllChange2(e) {
        Object.assign(this, {
          checkedList2: e.target.checked ? plainOptions2 : [],
          indeterminate2: false,
          checkAll2: e.target.checked,
        })
      },
    },
  }
</script>

<style scoped>
  .subjects {
    margin: 0 40px 0 40px;
  }
  .condition {
    margin-top: 30px;
    /* border: 1px solid #eceaea; */
  }
  .shcoolTable {
    margin-top: 30px;
    border: 1px solid #eceaea;
  }
</style>>

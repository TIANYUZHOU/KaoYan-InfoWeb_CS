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
            <a-col
              :span="12"
              style="padding-right: 0px; border-right: 1px solid #eceaea"
            >
              <!-- 考试范围卡片 -->
              <a-card
                title="专业课"
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
            <a-col :span="12" style="padding-left: 0px">
              <!-- 院校标签卡片 -->
              <a-card
                title="院校标签"
                type="inner"
                :bordered="false"
                :bodyStyle="{ padding: '10px' }"
              >
                <a-card title="院校属性" style="width: 100%">
                  <!-- 多选框 -->
                  <!-- <div>
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
                  </div> -->
                  <!-- 单选框 -->
                  <a-radio-group v-model="value">
                    <a-radio :value="1"> 985工程 </a-radio>
                    <a-radio :value="2"> 211工程 </a-radio>
                    <a-radio :value="3"> 一流大学 </a-radio>
                    <a-radio :value="4"> 一流学科 </a-radio>
                    <a-radio :value="5"> 其他 </a-radio>
                  </a-radio-group>
                </a-card>
              </a-card>
            </a-col>
          </a-row>
          <!-- 卡片事件组件 -->
          <template slot="actions" class="ant-card-actions">
            <a-button @click="submitCheckBox" type="primary" size="large"
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
                  <a @click="routeTo(2)">按学校筛选</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="routeTo(3)">按专业筛选</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown></a
          >
        </a-card>
      </div>
      <div class="shcoolTable">
        <a-table :columns="columns" :data-source="schoolData">
          <a
            slot="schName"
            slot-scope="text"
            @click="$router.push({ path: '/majors', query: { schName: text } })"
            >{{ text }}</a
          >
          <span slot="customTitle"><a-icon type="fire" />院校名称</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag" :color="tagColor(tag)">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="subReview" slot-scope="text">
            <a-tag color="#f50"> {{ text.subReviewCS }} </a-tag>
            <a-tag color="#2db7f5"> {{ text.subReviewSE }} </a-tag>
          </span>
          <span slot="collect" slot-scope="text">
            <a @click="addCollectItem(text.schId)">收藏</a>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
  import myAxios from '@/utils/axios'
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
    {
      title: '点击收藏',
      // dataIndex: 'subReview',
      key: 'collect',
      scopedSlots: { customRender: 'collect' },
      align: 'center',
    },
  ]
  // 筛选后学校表格数据
  const schoolData = [
    // {
    //   key: '1',
    //   schName: '北京大学',
    //   province: '北京',
    //   belong: '教育部',
    //   tags: ['一流大学', '一流学科', '985', '211'],
    //   subReviewCS: '计算机：A+',
    //   subReviewSE: '软件：A+',
    // },
    // {
    //   key: '2',
    //   schName: '四川农业大学',
    //   province: '四川',
    //   belong: '四川省',
    //   tags: ['一流学科', '211'],
    //   // subReviewCS: '计算机：无',   不写就是一条杠
    //   // subReviewSE: '软件：无',
    // },
    // {
    //   key: '3',
    //   schName: '新疆大学',
    //   province: '新疆',
    //   belong: '新疆维吾尔自治区',
    //   tags: ['一流大学', '一流学科', '211'],
    //   subReviewCS: '计算机：B-',
    //   subReviewSE: '软件：C+',
    // },
  ]
  // 多选框参数
  const plainOptions = ['一门', '两门', '三门', '四门', '408']
  const defaultCheckedList = ['408']
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

        // 单选框参数
        value: 1,
        // 学校id
        schIdList: this.$store.state.userInfo.schIdList,
      }
    },
    mounted() {
      this.submitCheckBox()
    },
    methods: {
      // 卡片下拉栏路由
      routeTo(id) {
        if (id === 2) {
          this.$router.push('/schools')
          this.$store.commit('ChangeNavId', id)
        } else if (id === 3) {
          this.$router.push('/majors')
          this.$store.commit('ChangeNavId', id)
        } else if (id === 4) {
          this.$router.push('/subjects')
          this.$store.commit('ChangeNavId', id)
          // console.log(id)
        }
      },
      // 计算学校标签颜色
      tagColor(tag) {
        // console.log(tag)
        if (tag === '一流大学') {
          return 'volcano'
        } else if (tag === '一流学科') {
          return 'pink'
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
      // 提交查询
      submitCheckBox() {
        schoolData.splice(0)
        if (this.checkedList.length === 0) {
          // url = [baseUrl]
        } else {
          let proMap = {
            一门: '1',
            两门: '2',
            三门: '3',
            四门: '4',
            408: '四零八',
          }
          const schPropertMap = {
            1: 'is_985',
            2: 'is_211',
            3: 'is_firClassU',
            4: 'is_firClassS',
            5: 'is_else',
          }
          // const submitCheckedList = this.checkedList.map((item) => map[item])
          // submitCheckedList.forEach((value) => {
          //   url.push(baseUrl + '?matClass=' + value)
          // })
          const proCourseCountParameter = this.checkedList
            .map((item) => proMap[item])
            .join(',')
          // console.log(submitParameter)
          // const schPropertyParameter = this.checkedList2
          //   .map((item) => schPropertMap[item] + '=true')
          //   .join('&')
          const schPropertyParameter = schPropertMap[this.value] + '=true'
          let url =
            'http://127.0.0.1:8000/api/schools/?' +
            'proCourseCount=' +
            proCourseCountParameter +
            '&' +
            schPropertyParameter
          // console.log(url)
          let key = 1
          myAxios
            .get(url)
            .then((res) => {
              // console.log(res.data)
              res.data.forEach((item) => {
                const schData = {
                  schId: item.id,
                  key: key++,
                  schName: item.schName,
                  province: item.location,
                  belong: item.subjection,
                  tags: [],
                  subReviewCS: item.assessmentCS
                    ? '计算机：' + item.assessmentCS
                    : '',
                  subReviewSE: item.assessmentSE
                    ? '软件：' + item.assessmentSE
                    : '',
                }
                // console.log(schData)
                if (item.is_985) schData.tags.push('985')
                if (item.is_211) schData.tags.push('211')
                if (item.is_firClassU) schData.tags.push('一流大学')
                if (item.is_firClassS) schData.tags.push('一流学科')
                if (item.is_else) schData.tags.push('四非')
                schoolData.push(schData)
              })
              // console.log(schoolData)
            })
            .catch((e) => {
              if (e.response.status === 401) {
                alert('请先登录！')
                this.$store.state.navbarId = 1
                this.$router.push('/')
              } else {
                alert(e)
              }
            })
        }
      },
      // 收藏
      addCollectItem(schId) {
        {
          if (!this.$store.state.userInfo.user_id) {
            alert('请先登录再执行此操作!')
            return
          }
          let user_id = this.$store.state.userInfo.user_id
          let colId = this.$store.state.userInfo.colId
          let url = 'http://127.0.0.1:8000/api/collect/' + colId + '/'
          // console.log(this.schIdList)
          // console.log(this.schIdList.indexOf(8))
          if (this.schIdList.indexOf(schId) !== -1) {
            alert('已经在收藏夹啦！')
            return
          }
          // 如果没有收藏过该学校
          this.schIdList.push(schId)
          // console.log(this.schIdList)
          let parameter = {
            id: colId,
            user: user_id,
            school: this.schIdList,
          }
          // console.log(parameter)
          myAxios
            .put(url, parameter) // 为啥用 PUT 而不是 DELETE？ ：这里删除后端其实用的是 update方法
            .then(() => {
              localStorage.schIdList = this.schIdList
              this.$store.state.userInfo.schIdList = this.schIdList
              alert('添加收藏成功！')
            })
            .catch((e) => {
              if (e.response.status === 401) {
                alert('请先登录！')
                this.$store.state.navbarId = 1
                this.$router.push('/')
              } else {
                alert(e)
              }
            })
        }
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

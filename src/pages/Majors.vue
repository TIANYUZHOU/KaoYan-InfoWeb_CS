<template>
  <div>
    <sec-navbar />
    <div class="majoys">
      <div class="condition">
        <a-card title="专业筛选 >">
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
                  <a @click="routeTo(4)">按科目筛选</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown></a
          >
          <div class="cascader">
            <a-space :size="50">
              <!-- 省市选择 -->
              <a-select
                size="large"
                label-in-value
                placeholder="选择省市"
                style="width: 150px"
                @change="handleChangePro"
              >
                <a-select-option
                  v-for="pro in provinces"
                  :key="pro.code"
                  :value="pro.province"
                >
                  {{ pro.name }}
                </a-select-option>
              </a-select>
              <!-- 院校名称输入 -->
              <a-input
                style="width: 200px"
                size="large"
                placeholder="院校名称"
                v-model="searchContent.school__schName"
              />
              <!-- 专业选择 -->
              <a-select
                placeholder="选择门类"
                :defaultValue="categoriesXue[0]"
                size="large"
                style="width: 150px"
                @change="handleCategorieChange"
              >
                <a-select-opt-group>
                  <span slot="label" style="font-weight: bold"
                    ><a-icon type="heart" /> 学术学位</span
                  >
                  <a-select-option
                    v-for="categorie in categoriesXue"
                    :key="categorie"
                  >
                    {{ categorie }}
                  </a-select-option>
                </a-select-opt-group>
                <a-select-opt-group>
                  <span slot="label" style="font-weight: bold"
                    ><a-icon type="dollar" /> 专业学位</span
                  >
                  <a-select-option
                    v-for="categorie in categoriesZhuan"
                    :key="categorie"
                  >
                    {{ categorie }}
                  </a-select-option>
                </a-select-opt-group>
              </a-select>
              <a-select
                placeholder="选择学科"
                notFoundContent="请先选择门类"
                v-model="discipline"
                size="large"
                style="width: 200px"
              >
                <a-select-option v-for="dis in disciplines" :key="dis">
                  {{ dis }}
                </a-select-option>
              </a-select>
              <!-- 学习方式选择 -->
              <a-select
                size="large"
                label-in-value
                placeholder="学习方式"
                style="width: 150px"
                @change="handleChangeLeaM"
              >
                <a-select-option
                  v-for="LeaMethod in LeaMethods"
                  :key="LeaMethod"
                  :value="LeaMethod"
                >
                  {{ LeaMethod }}
                </a-select-option>
              </a-select>
              <a-button
                siez="large"
                type="primary"
                style="height: 35px; font-size: 15px"
                @click="submitSearch"
              >
                确认
              </a-button>
            </a-space>
          </div>
        </a-card>
      </div>
      <div class="majoyTable">
        <a-table :columns="columns" :data-source="majorData">
          <span slot="academy" slot-scope="text">{{ text }}</span>
          <span slot="schCustomTitle"><a-icon type="bulb" />所属院校</span>
          <span slot="acaCustomTitle">院系所</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag" :color="tagColor(tag)">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <a
            slot="others"
            slot-scope="text, record"
            @click="showDrawer(record)"
          >
            {{ text }}
          </a>
          <!-- 详细信息抽屉 --> </a-table
        ><a-drawer
          title="专业目录"
          placement="top"
          height="80%"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
        >
          <a-descriptions title="详细信息" bordered>
            <a-descriptions-item label="院校名称" :span="1">
              {{ record.schName }}
            </a-descriptions-item>
            <a-descriptions-item label="院系" :span="2">
              {{ record.academy }}
            </a-descriptions-item>
            <a-descriptions-item label="专业">
              <a-popover title="历年复试分数线" placement="bottomRight">
                <template slot="content">
                  <v-chart class="chart" :option="getOption(record.admScore)" />
                </template>
                <a-button type="link" style="padding: 0px">
                  {{ record.major }}
                </a-button>
              </a-popover>
            </a-descriptions-item>
            <a-descriptions-item label="研究方向" :span="2">
              {{ record.researchDir }}
            </a-descriptions-item>
            <a-descriptions-item label="考试方式">
              {{ record.examForm }}
            </a-descriptions-item>
            <a-descriptions-item label="学习方式">
              {{ record.leaMethod }}
            </a-descriptions-item>
            <a-descriptions-item label="拟招生人数">
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="tagColor(tag)"
              >
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item :span="3" label="考试范围">
              {{ record.examScope }}
            </a-descriptions-item>
            <a-descriptions-item label="备注">
              {{ record.remark }}
            </a-descriptions-item>
          </a-descriptions>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
  import myAxios from '@/utils/axios'
  const Categories = ['工学', '理学', '专业学位']
  const Disciplines = {
    理学: ['（0775）计算机科学与技术'],
    工学: [
      '（0812）计算机科学与技术',
      '（0835）软件工程',
      '（0839）网络空间安全',
      '（0828Z）农业信息工程类',
    ],
    专业学位: ['（0854）电子信息', '(095136)农业工程与信息技术'],
  }
  // 筛选后学校表格
  const columns = [
    {
      dataIndex: 'schName',
      key: 'schName',
      slots: { title: 'schCustomTitle' },
      scopedSlots: { customRender: 'schName' },
    },
    {
      dataIndex: 'academy', // academy学院
      key: 'academy',
      slots: { title: 'acaCustomTitle' },
      scopedSlots: { customRender: 'academy' },
    },
    {
      title: '专业',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: '研究方向',
      dataIndex: 'researchDir',
      key: 'researchDir',
    },
    {
      title: '学习方式',
      dataIndex: 'leaMethod',
      key: 'leaMethod',
    },
    {
      title: '招生人数',
      key: 'tags',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' },
    },
    {
      title: '更多信息',
      dataIndex: 'others',
      key: 'others',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'others' },
    },
  ]
  // 筛选后学校表格数据
  const majorData = [
    // {
    //   key: '1',
    //   schName: '重庆大学',
    //   academy: '计算机学院（软件学院）',
    //   major: '计算机科学与技术',
    //   researchDir: '计算机系统结构',
    //   leaMethod: '全日制',
    //   // toBeEnrolled: '17',
    //   others: '考试范围、学制、学费等',
    //   tags: ['专业：17(不含推免)'],
    //   // tags: ['一流大学A类', '985', '211'],
    //   // subReviewCS: '计算机：A+',
    //   // subReviewES: '软件：A+',
    // },
    // {
    //   key: '2',
    //   schName: '重庆大学',
    //   academy: '计算机学院',
    //   major: '计算机科学与技术',
    //   researchDir: '物联网与边缘智能',
    //   leaMethod: '全日制',
    //   others: '考试范围、学制、学费等',
    //   tags: ['专业：10(不含推免)'],
    // },
  ]
  // 导入标题卡片导航
  import secNavbar from './pubChildren/secNavbar.vue'
  export default {
    name: 'majors',
    components: { secNavbar },
    data() {
      return {
        provinces: [
          {
            code: '110000',
            name: '北京',
            province: '11',
            bigRegion: 'hb',
          },
          {
            code: '120000',
            name: '天津',
            province: '12',
            bigRegion: 'hb',
          },
          {
            code: '130000',
            name: '河北',
            province: '13',
            bigRegion: 'hb',
          },
          {
            code: '140000',
            name: '山西',
            province: '14',
            bigRegion: 'hb',
          },
          {
            code: '150000',
            name: '内蒙古',
            province: '15',
            bigRegion: 'hb',
          },
          {
            code: '210000',
            name: '辽宁省',
            province: '21',
            bigRegion: 'db',
          },
          {
            code: '220000',
            name: '吉林',
            province: '22',
            bigRegion: 'db',
          },
          {
            code: '230000',
            name: '黑龙江',
            province: '23',
            bigRegion: 'db',
          },
          {
            code: '310000',
            name: '上海',
            province: '31',
            bigRegion: 'hd',
          },
          {
            code: '320000',
            name: '江苏',
            province: '32',
            bigRegion: 'hd',
          },
          {
            code: '330000',
            name: '浙江',
            province: '33',
            bigRegion: 'hd',
          },
          {
            code: '340000',
            name: '安徽',
            province: '34',
            bigRegion: 'hd',
          },
          {
            code: '350000',
            name: '福建',
            province: '35',
            bigRegion: 'hd',
          },
          {
            code: '360000',
            name: '江西',
            province: '36',
            bigRegion: 'hz',
          },
          {
            code: '370000',
            name: '山东',
            province: '37',
            bigRegion: 'hd',
          },
          {
            code: '410000',
            name: '河南',
            province: '41',
            bigRegion: 'hz',
          },
          {
            code: '420000',
            name: '湖北',
            province: '42',
            bigRegion: 'hz',
          },
          {
            code: '430000',
            name: '湖南',
            province: '43',
            bigRegion: 'hz',
          },
          {
            code: '440000',
            name: '广东',
            province: '44',
            bigRegion: 'hn',
          },
          {
            code: '450000',
            name: '广西',
            province: '45',
            bigRegion: 'hn',
          },
          {
            code: '460000',
            name: '海南',
            province: '46',
            bigRegion: 'hn',
          },
          {
            code: '500000',
            name: '重庆',
            province: '50',
            bigRegion: 'xn',
          },
          {
            code: '510000',
            name: '四川',
            province: '51',
            bigRegion: 'xn',
          },
          {
            code: '520000',
            name: '贵州',
            province: '52',
            bigRegion: 'xn',
          },
          {
            code: '530000',
            name: '云南',
            province: '53',
            bigRegion: 'xn',
          },
          {
            code: '540000',
            name: '西藏',
            province: '54',
            bigRegion: 'xn',
          },
          {
            code: '610000',
            name: '陕西',
            province: '61',
            bigRegion: 'xb',
          },
          {
            code: '620000',
            name: '甘肃',
            province: '62',
            bigRegion: 'xb',
          },
          {
            code: '630000',
            name: '青海',
            province: '63',
            bigRegion: 'xb',
          },
          {
            code: '640000',
            name: '宁夏',
            province: '64',
            bigRegion: 'xb',
          },
          {
            code: '650000',
            name: '新疆',
            province: '65',
            bigRegion: 'xb',
          },
        ],
        Categories,
        Disciplines,
        disciplines: Disciplines[Categories[0]],
        discipline: Disciplines[Categories[0]][0],
        LeaMethods: ['全日制', '非全日制'],
        columns,
        majorData,
        // 抽屉配置
        visible: false,
        // 每一行记录（对象）
        record: {},

        searchContent: {
          school__location: '',
          school__schName: '',
          search: '', // 后的段 search 模糊查询 专业 字段
          learnForm: '',
        },
      }
    },
    mounted() {
      this.firstSubmit()
    },
    methods: {
      // 省份选择监测
      handleChangePro(value) {
        // console.log(value) // { key: "lucy", label: "Lucy (101)" }
        this.searchContent.school__location = value.label.trim()
      },
      // 监控门类改变
      handleCategorieChange(value) {
        this.disciplines = Disciplines[value]
        this.discipline = Disciplines[value][0]
        // console.log(value)
      },
      // 学习方式监测
      handleChangeLeaM(value) {
        // console.log(value) // { key: "lucy", label: "Lucy (101)" }
        this.searchContent.learnForm = value.label.trim()
      },
      // 卡片下拉栏路由
      routeTo(id) {
        if (id === 2) {
          this.$router.push('/schools')
          this.$store.commit('ChangeNavId', id)
        } else if (id === 3) {
          this.$router.push('/majoys')
          this.$store.commit('ChangeNavId', id)
        } else if (id === 4) {
          this.$router.push('/subjects')
          this.$store.commit('ChangeNavId', id)
          // console.log(id)
        }
      },
      // 计算招生人数标签颜色
      tagColor(tag) {
        // 提取数字
        let num = tag.replace(/[^\d]/g, ' ')
        // console.log(num)
        if (num < 10) {
          return 'volcano'
        } else if (num >= 10 && num < 20) {
          return 'orange'
        } else if (num >= 30 && num < 50) {
          return 'green'
        } else if (num >= 50) {
          return 'cyan'
        } else {
          return tag.length > 5 ? 'geekblue' : 'purple'
        }
      },
      // 抽屉函数
      afterVisibleChange() {
        // console.log('visible', val)
      },
      showDrawer(record) {
        // 获取数据记录（对象） 便于在详细描述中确定对应信息
        this.record = record
        // console.log(record)
        this.visible = true
      },
      onClose() {
        this.visible = false
      },
      submitSearch() {
        this.majorData.splice(0)
        this.searchContent.search = this.discipline.match(/(\d+)/g)[0]
        let url = 'http://127.0.0.1:8000/api/majors/?'
        // console.log(this.searchContent)
        Object.keys(this.searchContent).forEach((item) => {
          url = url + item + '=' + this.searchContent[item] + '&'
        })
        url = url.slice(0, -1)
        // console.log(url)
        let key = 1
        myAxios
          .get(url)
          .then((res) => {
            // console.log(res.data)
            res.data.forEach((item) => {
              const majData = {
                key: key++,
                schName: item.school.schName,
                academy: item.institute,
                major: item.major,
                researchDir: item.resDirection,
                leaMethod: item.learnForm,
                remark: item.remark,
                examForm: item.examForm,
                examScope: item.examScope,
                others: '考试范围、学制、学费等',
                tags: [item.enrPlan],
                admScore: item.admScore,
              }
              majorData.push(majData)
            })
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
      },
      // 首次加载（从收藏跳转）
      firstSubmit() {
        if (this.$route.query.schName) {
          this.majorData.splice(0)
          this.searchContent.school__schName = this.$route.query.schName
          this.submitSearch()
        }
      },
      // 获取 echarts option数据
      getOption(admScore) {
        let data = admScore?.split('|') ?? [0, 0, 0, 0, 0]
        // console.log(admScore)
        let myoption = {
          xAxis: {
            name: '年份',
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022'],
          },
          yAxis: {
            name: '分数线',
            type: 'value',
            min: 0,
            max: 500,
          },
          series: [
            {
              // data: [260, 290, 320, 347,0],
              data,
              type: 'line',
              smooth: true,
              label: { show: true },
            },
          ],
        }
        return myoption
      },
    },
    computed: {
      // 过滤筛选 categories
      categoriesXue() {
        return this.Categories.filter(function (x) {
          return x != '专业学位'
        })
      },
      categoriesZhuan() {
        return this.Categories.filter(function (x) {
          return x === '专业学位'
        })
      },
    },
  }
</script>

<style scpoed>
  .majoys {
    margin: 0 40px 0 40px;
  }
  .condition {
    margin-top: 30px;
    /* border: 1px solid #eceaea; */
  }
  .majoyTable {
    margin-top: 30px;
    border: 1px solid #eceaea;
  }
  .chart {
    height: 350px;
    width: 400px;
  }
</style>
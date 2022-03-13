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
                  <a @click="routeTo(1)">按学校筛选</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="routeTo(3)">按科目筛选</a>
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
              >
                确认
              </a-button>
            </a-space>
          </div>
        </a-card>
      </div>
      <div class="majoyTable">
        <a-table :columns="columns" :data-source="majoyData">
          <span slot="academy" slot-scope="text">{{ text }}</span>
          <span slot="customTitle"><a-icon type="bulb" />院系</span>
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
          height="50%"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
        >
          <a-descriptions title="详细信息" bordered>
            <a-descriptions-item label="院校名称" :span="1">
              重庆大学
            </a-descriptions-item>
            <a-descriptions-item label="院系" :span="2">
              计算机学院
            </a-descriptions-item>
            <a-descriptions-item label="专业">
              计算机科学与技术
            </a-descriptions-item>
            <a-descriptions-item label="研究方向" :span="2">
              物联网与边缘智能
            </a-descriptions-item>
            <a-descriptions-item label="考试方式"> 统考 </a-descriptions-item>
            <a-descriptions-item label="学习方式"> 全日制 </a-descriptions-item>
            <a-descriptions-item label="拟招生人数">
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="tagColor(tag)"
              >
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="备注">
              一、复试科目：①外语听力、口语；②C++程序设计和C语言上机考试。
              二、同等学力等考生加试：①离散数学；②数据库原理。
            </a-descriptions-item>
          </a-descriptions>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
  const Categories = ['工学', '理学', '专业学位']
  const Disciplines = {
    理学: ['计算机科学与技术'],
    工学: ['计算机科学与技术', '软件工程', '网络空间安全'],
    专业学位: ['电子信息'],
  }
  // 筛选后学校表格
  const columns = [
    {
      dataIndex: 'academy', // academy学院
      key: 'academy',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'academy' },
    },
    {
      title: '专业',
      dataIndex: 'major',
      key: ' major',
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
  const majoyData = [
    {
      key: '1',
      academy: '计算机学院（软件学院）',
      major: '计算机科学与技术',
      researchDir: '计算机系统结构',
      leaMethod: '全日制',
      // toBeEnrolled: '17',
      others: '考试范围、学制、学费等',
      tags: ['专业：17(不含推免)'],
      // tags: ['一流大学A类', '985', '211'],
      // subReviewCS: '计算机：A+',
      // subReviewES: '软件：A+',
    },
    {
      key: '2',
      academy: '计算机学院',
      major: '计算机科学与技术',
      researchDir: '物联网与边缘智能',
      leaMethod: '全日制',
      others: '考试范围、学制、学费等',
      tags: ['专业：10(不含推免)'],
    },
  ]
  // 导入标题卡片导航
  import secNavbar from './pubChildren/secNavbar.vue'
  export default {
    name: 'majoys',
    components: { secNavbar },
    data() {
      return {
        provinces: [
          {
            code: '110000',
            name: '北京市',
            province: '11',
            bigRegion: 'hb',
          },
          {
            code: '120000',
            name: '天津市',
            province: '12',
            bigRegion: 'hb',
          },
          {
            code: '130000',
            name: '河北省',
            province: '13',
            bigRegion: 'hb',
          },
          {
            code: '140000',
            name: '山西省',
            province: '14',
            bigRegion: 'hb',
          },
          {
            code: '150000',
            name: '内蒙古自治区',
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
            name: '吉林省',
            province: '22',
            bigRegion: 'db',
          },
          {
            code: '230000',
            name: '黑龙江省',
            province: '23',
            bigRegion: 'db',
          },
          {
            code: '310000',
            name: '上海市',
            province: '31',
            bigRegion: 'hd',
          },
          {
            code: '320000',
            name: '江苏省',
            province: '32',
            bigRegion: 'hd',
          },
          {
            code: '330000',
            name: '浙江省',
            province: '33',
            bigRegion: 'hd',
          },
          {
            code: '340000',
            name: '安徽省',
            province: '34',
            bigRegion: 'hd',
          },
          {
            code: '350000',
            name: '福建省',
            province: '35',
            bigRegion: 'hd',
          },
          {
            code: '360000',
            name: '江西省',
            province: '36',
            bigRegion: 'hz',
          },
          {
            code: '370000',
            name: '山东省',
            province: '37',
            bigRegion: 'hd',
          },
          {
            code: '410000',
            name: '河南省',
            province: '41',
            bigRegion: 'hz',
          },
          {
            code: '420000',
            name: '湖北省',
            province: '42',
            bigRegion: 'hz',
          },
          {
            code: '430000',
            name: '湖南省',
            province: '43',
            bigRegion: 'hz',
          },
          {
            code: '440000',
            name: '广东省',
            province: '44',
            bigRegion: 'hn',
          },
          {
            code: '450000',
            name: '广西壮族自治区',
            province: '45',
            bigRegion: 'hn',
          },
          {
            code: '460000',
            name: '海南省',
            province: '46',
            bigRegion: 'hn',
          },
          {
            code: '500000',
            name: '重庆市',
            province: '50',
            bigRegion: 'xn',
          },
          {
            code: '510000',
            name: '四川省',
            province: '51',
            bigRegion: 'xn',
          },
          {
            code: '520000',
            name: '贵州省',
            province: '52',
            bigRegion: 'xn',
          },
          {
            code: '530000',
            name: '云南省',
            province: '53',
            bigRegion: 'xn',
          },
          {
            code: '540000',
            name: '西藏自治区',
            province: '54',
            bigRegion: 'xn',
          },
          {
            code: '610000',
            name: '陕西省',
            province: '61',
            bigRegion: 'xb',
          },
          {
            code: '620000',
            name: '甘肃省',
            province: '62',
            bigRegion: 'xb',
          },
          {
            code: '630000',
            name: '青海省',
            province: '63',
            bigRegion: 'xb',
          },
          {
            code: '640000',
            name: '宁夏回族自治区',
            province: '64',
            bigRegion: 'xb',
          },
          {
            code: '650000',
            name: '新疆维吾尔自治区',
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
        majoyData,
        // 抽屉配置
        visible: false,
        // 每一行记录（对象）
        record: {},
      }
    },
    methods: {
      // 省份选择监测
      handleChangePro(value) {
        console.log(value) // { key: "lucy", label: "Lucy (101)" }
      },
      // 监控门类改变
      handleCategorieChange(value) {
        this.disciplines = Disciplines[value]
        this.discipline = Disciplines[value][0]
        console.log(value)
      },
      // 学习方式监测
      handleChangeLeaM(value) {
        console.log(value) // { key: "lucy", label: "Lucy (101)" }
      },
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
      afterVisibleChange(val) {
        console.log('visible', val)
      },
      showDrawer(record) {
        // 获取数据记录（对象） 便于在详细描述中确定对应信息
        this.record = record
        this.visible = true
      },
      onClose() {
        this.visible = false
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
</style>
<template>
  <div>
    <sec-navbar></sec-navbar>
    <div class="schools">
      <div class="condition">
        <!-- 条件选择 -->
        <a-card
          style="width: 100%"
          title="学校筛选 >"
          :bodyStyle="{ padding: 0 }"
          :hoverable="true"
          :tab-list="tabList"
          :active-tab-key="key"
          @tabChange="(key) => onTabChange(key, 'key')"
        >
          <span slot="schRegions" slot-scope="item">
            <a-icon type="global" />{{ item.tabName }}
          </span>
          <span slot="schFeatures" slot-scope="item">
            <a-icon type="check-circle" />{{ item.tabName }}
          </span>
          <a slot="extra" href="#"
            ><a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                其他筛选 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="routeTo(2)">按专业筛选</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="routeTo(3)">按科目筛选</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown></a
          >
          <!-- {{ contentList[key] }} -->
          <!-- 地区选择  -->
          <a-card
            v-if="key === 'schRegions'"
            :bordered="false"
            style="width: 100%"
            type="inner"
            :tab-list="tabListNoTitle"
            :active-tab-key="noTitleKey"
            @tabChange="(key) => onTabChange(key, 'noTitleKey')"
          >
            <p v-if="bigRegion(noTitleKey)">
              {{ contentListNoTitle[noTitleKey] }}
            </p>
            <!-- 省市卡片列表 -->
            <a-list :grid="{ gutter: 16, column: 6 }" :data-source="proData">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="item.title">
                  {{ index + 1 + ' ' + item.title }} 内容</a-card
                >
              </a-list-item>
            </a-list>
            <!-- <span v-for="(proNanme, index) in this.proList" :key="index"
            >{{ proNanme }}
          </span> -->
            <!-- <p v-if="bigRegion(noTitleKey)">article content</p> -->
            <!-- <a slot="tabBarExtraContent" href="#">More</a> -->
          </a-card>
          <!-- 特点选择 -->
          <a-collapse
            default-active-key="1"
            accordion
            v-if="key === 'schFeatures'"
            :style="customStyle"
          >
            <a-collapse-panel key="1" header="是否为“双一流建设”高校">
              <a-checkbox-group @change="onChange">
                <a-row>
                  <a-col :span="12">
                    <a-checkbox value="A"> 世界一流大学建设高校A类 </a-checkbox>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox value="B"> 世界一流大学建设高校B类 </a-checkbox>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox value="C"> 世界一流学科建设高校 </a-checkbox>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox value="C"> 其他 </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <!-- <p>{{ text }}</p> -->
            </a-collapse-panel>
            <a-collapse-panel
              key="2"
              header="是否为985、211高校"
              :disabled="false"
            >
              <a-checkbox-group @change="onChange">
                <a-row>
                  <a-col :span="12">
                    <a-checkbox value="A"> 985工程建设高校 </a-checkbox>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox value="B"> 211工程建设高校 </a-checkbox>
                  </a-col>
                  <a-col :span="12">
                    <a-checkbox value="C"> 其他 </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <!-- <p>{{ text }}</p> -->
            </a-collapse-panel>
            <a-collapse-panel style="border-bottom: 0px;" key="3" header="其他条件">
              <a-checkbox-group @change="onChange">
                <a-row>
                  <a-col :span="24">
                    <a-checkbox value="A"> 教育部直属 </a-checkbox>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox value="B"> 自主划线 </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <!-- <p>{{ text }}</p> -->
            </a-collapse-panel>
          </a-collapse>
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
  // 省市卡片数据
  let proData = []
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
  export default {
    components: { secNavbar },
    name: 'Schools',
    data() {
      return {
        path: '/schools',
        proData, // 省市卡片数据
        columns, // 筛选后学校表格
        schoolData, // 筛选后学校数据
        visible: false,
        big_regions: [
          { id: '01', name: '北京 上海 华北 东北 华东 华中 华南 西北 西南' },
        ],
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
          {
            code: '710000',
            name: '台湾省',
            province: '71',
            bigRegion: 'gat',
          },
          {
            code: '810000',
            name: '香港特别行政区',
            province: '81',
            bigRegion: 'gat',
          },
          {
            code: '820000',
            name: '澳门特别行政区',
            province: '82',
            bigRegion: 'gat',
          },
        ],
        proList: [],
        schools: {
          schoolname: '北京大学',
          is985: true,
          is211: true,
          isWorldClassU: true,
          isFirstClassDisU: true,
        },
        // 卡片配置
        tabList: [
          {
            key: 'schRegions',
            tabName: '所在地区',
            scopedSlots: { tab: 'schRegions' },
          },
          {
            key: 'schFeatures',
            // tab: '院校特点',
            tabName: '院校特点',
            scopedSlots: { tab: 'schFeatures' },
          },
        ],
        contentList: {
          // schRegions: 'content1',
          // schFeatures: 'content2',
        },
        tabListNoTitle: [
          {
            key: 'huabei',
            tab: '华北',
          },
          {
            key: 'dongbei',
            tab: '东北',
          },
          {
            key: 'huadong',
            tab: '华东',
          },
          {
            key: 'huazhong',
            tab: '华中',
          },
          {
            key: 'huanan',
            tab: '华南',
          },
          {
            key: 'xibei',
            tab: '西北',
          },
          {
            key: 'xinan',
            tab: '西南',
          },
          // 东北 华东 华中 华南 西北 西南
        ],
        contentListNoTitle: {
          // huadong: '华东content',
          // xinan: '西南content',
        },
        key: 'schRegions',
        noTitleKey: 'huadong',

        // 折叠框配置
        text: '',

        customStyle:
          'background: #fafafa; border-top: 1px solid #eceaea;border-left: 0px;border-right: 0px;',
      }
    },
    computed: {
      // isDoubleFirstU() {
      //   if (this.schools.isWorldClassU && this.schools.isFirstClassDisU) {
      //     return '是'
      //   } else {
      //     return '否'
      //   }
      // },
    },
    methods: {
      // 卡片改变检测函数
      onTabChange(key, type) {
        console.log('大区选择改变')
        console.log(key, type)
        this[type] = key
        return true
      },
      // 匹配对应大地区按钮，改地区显示下级省区名
      bigRegion(noTitleKey) {
        let flag = false
        this.tabListNoTitle.forEach((element) => {
          if (noTitleKey === element.key) {
            // console.log(element.key, noTitleKey)
            // console.log(noTitleKey === element.key)
            flag = true
          }
        })
        return flag
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

      // 多选框检测函数
      onChange(checkedValues) {
        console.log('checked = ', checkedValues)
      },
      // 筛取对应大区域划分下，所属的省市，港澳台除外
      getProList() {
        for (let i = 0; i < this.provinces.length; i++) {
          if (
            this.provinces[i].bigRegion === 'hb' &&
            this.noTitleKey === 'huabei'
          ) {
            this.proList.push(this.provinces[i].name)
            // 将筛选的省市名数据，加入省市卡片的title
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'hd' &&
            this.noTitleKey === 'huadong'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'hz' &&
            this.noTitleKey === 'huazhong'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'hn' &&
            this.noTitleKey === 'huanan'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'xn' &&
            this.noTitleKey === 'xinan'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'xb' &&
            this.noTitleKey === 'xibei'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          } else if (
            this.provinces[i].bigRegion === 'db' &&
            this.noTitleKey === 'dongbei'
          ) {
            this.proList.push(this.provinces[i].name)
            proData.push({ title: this.provinces[i].name })
          }
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
    },
    mounted() {},
    watch: {
      // 监测大区域划分key变化，以便获取所属省市
      noTitleKey: {
        handler() {
          // 如果选定的大区改变，先将筛选的省市数据数组置零
          // 否则会残留上次数据

          // 使用数组自带方法进行清空
          proData.splice(0, proData.length)
          this.proList.splice(0, this.proList.length)
          // this.proList = []
          this.getProList()
        },
        // 立即先去执行handler方法
        immediate: true,
      },
    },
    activated() {
      // this.$router.push(this.path)
    },
  }
</script>

<style scoped>
  .schools {
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
  /* 卡片插件样式 */
  text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
    display: flex;
  }

  .box-card {
    margin-top: 10px;
    /* width: 90%; */
  }
</style>
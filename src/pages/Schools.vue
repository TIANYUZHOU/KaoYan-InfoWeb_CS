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
          <a slot="extra" href="#"
            ><a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                其他筛选 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="routeTo(3)">按专业筛选</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="routeTo(4)">按科目筛选</a>
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
            <a-list :grid="{ gutter: 16, column: 12 }" :data-source="proData">
              <a-list-item slot="renderItem" slot-scope="item">
                <!-- <a-card :title="item.title">
                  {{ index + 1 + ' ' + item.title }} 内容</a-card
                > -->
                <!-- <a>{{item.title}}</a> -->
                <a-button
                  size="large"
                  ref="provinceButton"
                  @click="provinceSelect(item.title)"
                  >{{ item.title }}</a-button
                >
              </a-list-item>
            </a-list>
          </a-card>
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
    //   tags: ['一流大学A类', '985', '211'],
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
    //   tags: ['一流大学B类', '211'],
    //   subReviewCS: '计算机：B-',
    //   subReviewSE: '软件：C+',
    // },
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
            name: '辽宁',
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
          {
            code: '710000',
            name: '台湾',
            province: '71',
            bigRegion: 'gat',
          },
          {
            code: '810000',
            name: '香港',
            province: '81',
            bigRegion: 'gat',
          },
          {
            code: '820000',
            name: '澳门',
            province: '82',
            bigRegion: 'gat',
          },
        ],
        proList: [],
        // schools: {
        //   schoolname: '北京大学',
        //   is985: true,
        //   is211: true,
        //   isWorldClassU: true,
        //   isFirstClassDisU: true,
        // },
        // 卡片配置
        tabList: [
          {
            key: 'schRegions',
            tabName: '所在地区',
            scopedSlots: { tab: 'schRegions' },
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
        noTitleKey: 'huabei',

        // 折叠框配置
        text: '',

        customStyle:
          'background: #fafafa; border-top: 1px solid #eceaea;border-left: 0px;border-right: 0px;',
        // 学校id
        schIdList: this.$store.state.userInfo.schIdList,
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
        // console.log('大区选择改变')
        // console.log(key, type)
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

      // 多选框检测函数
      onChange() {
        // console.log('checked = ', checkedValues)
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
      // 省市选择
      provinceSelect(province) {
        schoolData.splice(0)
        // console.log(province)
        let url = 'http://127.0.0.1:8000/api/schools/?location=' + province
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
            // console.log(e)
            if (e.response.status === 401) {
              alert('请先登录！')
              this.$router.push('/')
            } else {
              alert(e)
            }
          })
      },
      // 首次加载
      provinceSelectFirst() {
        this.provinceSelect('北京')
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
                this.$router.push('/')
              } else {
                alert(e)
              }
            })
        }
      },
    },
    mounted() {
      // if (this.$refs.provinceButton.$el
      // console.log(this.$refs.provinceButton.$el.textContent)

      this.provinceSelectFirst()
    },
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
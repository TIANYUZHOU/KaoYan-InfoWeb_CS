//request.js 
/*
 对axios进行二次封装 请求拦截器增加token 响应拦截器处理大数据 
*/
import store from "@/store/index"
import axios from "axios"
/* 
自定义写法：const xxx = axios.create({}) 一个项目中可能有不同的服务器基础地址 就要用自定义写法设置不同的服务器基础地址 
*/
const myAxios = axios.create({ baseURL: "http://127.0.0.1:8000" })
// 在instance(这是上面定义的自定义axios请求名称)上添加请求拦截器 补充请求头token信息 
myAxios.interceptors.request.use(function (config) {
  // 从vuex中取出token,这里先这样写，下面会说这里是怎么回事 
  const token = store.state.userInfo.token
  // 如果有token则添加到headers中 
  if (token) {
    config.headers.Authorization = `Bearer ${token}` //这里的JWT是后端默认的token需要携带的字段，可在后端自定义，中间空格不能删除 } 
    return config
  }else{
    config.headers.Authorization = ''
    return config
  }
}, function (error) { return Promise.reject(error) })


export default myAxios

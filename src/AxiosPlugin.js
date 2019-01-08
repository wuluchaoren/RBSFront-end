require('es6-promise').polyfill()
import axios from 'axios'

export const Axios = axios.create({

  // baseURL: 'http://gscawv.natappfree.cc/',
  // baseURL:'http://loaclhost:8081',
  timeout: 10000,
})

// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {

  console.log('before send...')
  // 加上 token
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  else {
    //无token跳转
    this.$router.push({path:'/MTlogin'})
  }

  return config

},error =>{
  alert("错误的传参", 'fail')
  return Promise.reject(error)
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res =>{

  console.log('before receive...')

  console.log(res)

  console.log(res.status)

  //对响应数据做些事
  if(res.status!=200){
    alert(res.error_msg)
    return Promise.reject(res)
  }
  return res
}, error => {
  // 401 说明 token 验证失败
  // 可以直接跳转到登录页面，重新登录获取 token
  if(error.status === 401) {
    console.log('Need Authorization')
    if (localStorage.token){
      this.$router.go(-1)
    }
    else {
      location.href = '/MTlogin'
    }
    return Promise.reject(error.response.data)
  }
  else if (error.status ===404){
    // location.href = '/MTlogin'
  }
  else if (error.status === 500) {
    // 服务器错误
    // do something
    console.log('Sever error')
    return Promise.reject(error.response.data)
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data)
})

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}

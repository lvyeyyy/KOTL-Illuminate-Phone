import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request 超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求前做一些事情
    if (store.getters.token || store.getters.token2) {
      // 让每个请求头都携带 token
      config.headers['idnum'] = store.state.user.sfCode
    }
    config.headers['appid'] = store.state.settings.appId
    config.headers['appsecret'] = store.state.settings.appSecret
    return config
  },
  error => {
    // 在请求失败时做一些事情
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 一些比较特殊的返回值，就直接返回，跳过这一步。
    if (res.code === 100) {
      return res
    } else {
      Message({
        message: (res?.msg || res?.errMsg || '未知错误') + ' 错误代码：' + (res.code || ''),
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error((res?.msg || res?.errMsg || '未知错误') + ' 错误代码：' + (res.code || '')))
  },
  error => {
    console.error('err', error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

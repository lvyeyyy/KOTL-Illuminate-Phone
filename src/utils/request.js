import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store'
import { getToken, setToken } from './auth'

// create an axios instance
const service = axios.create({
  baseURL: window.api.VUE_APP_IP + window.api.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request 超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求前做一些事情
    // if (store.getters.token) {
    //   // 让每个请求头都携带 token
    //   config.headers['Authorization'] = getToken()
    if (store.getters.token2) {
      // 让每个请求头都携带 token
      setToken(store.getters.token2)
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 在请求失败时做一些事情
    return Promise.reject(error)
  }
)

// response 拦截器
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
    /**
     * 42101：用户名是否存在的验证
     */
    if (res.code === 42101) {
      return res
    }

    // if the custom code is not 10000, it is judged as an error.
    // 如果自定义代码不为10000，则判断为错误
    if (res.code !== 10000) {
      // 40001: Illegal token 非法令牌; 50012: Other clients logged in 其他用户登录; 43104: Token expired 令牌过期;
      if (res.code === 40001 || res.code === 50012 || res.code === 43104) {
        // to re-login
        MessageBox.alert((res.msg || '未知错误') + ' ' + (res.code || ''), '确认注销', {
          confirmButtonText: '重新登录'
        }).then(() => {
          // 调用方法回到APP的首页
          client.reLogin()
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      } else if (res.code === 40010 || res.code === 40005) {
        Message({
          message: (res.msg || '未知错误') + ' ' + (res.code || ''),
          type: 'warning',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: (res.msg || '未知错误') + ' ' + (res.code || ''),
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error((res.msg || '未知错误') + ' ' + (res.code || '')))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

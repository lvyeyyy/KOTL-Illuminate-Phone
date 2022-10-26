import request from '../utils/request'

/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}

/**
 * 验证用户名是否存在
 * @param username
 */
export function checkUserName(username) {
  return request({
    url: '/user/checkusername',
    method: 'get',
    params: { username }
  })
}

/**
 * 获取用户详细信息
 * @param accessToken
 */
export function getInfo(accessToken) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: { accessToken }
  })
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 获取当前用户权限
 * @returns {Promise}
 */
export function getUserPermissions() {
  return request({
    url: '/authHandler/getCurrentUserPermissions',
    method: 'get'
  })
}

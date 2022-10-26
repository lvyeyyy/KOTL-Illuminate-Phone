import { checkUserName } from '../api/user'

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // if (str === '') {
  //   return false
  // }
  // return true
  return str !== ''
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 密码验证方法
 * @param rule
 * @param {string} value
 * @param {function} callback
 */
export function validatePassword(rule, value, callback) {
  if (value.length < 6) {
    callback(new Error('密码不能少于 6 位'))
  } else {
    callback()
  }
}

/**
 * 用户名验证方法
 * @param rule
 * @param {string} value
 * @param {function} callback
 */
export function validateUsername(rule, value, callback) {
  if (!validUsername(value)) {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3) {
    callback(new Error('用户名长度不能少于 3 位'))
  } else {
    checkUserName(value).then(response => {
      if (response.code === 10000) {
        callback()
      } else {
        callback(new Error(response.msg))
      }
    }).catch(() => {
      callback(new Error('未知错误'))
    })
  }
}

/**
 * 身份证验证方法
 * @param rule
 * @param {string} value
 * @param {function} callback
 */
export function validateIdCard(rule, value, callback) {
  // 1 "验证通过!", 0 //校验不通过
  if (value.length !== 18) {
    callback(new Error('身份证号码长度应该为 18 位'))
    return { 'status': 0, 'msg': '身份证号码长度应该为 18 位' }
  }
  const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(value)) {
    callback(new Error('身份证号码不合规'))
    return { 'status': 0, 'msg': '身份证号码不合规' }
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  // 身份证年
  const year = value.substr(6, 4)
  // 身份证月
  const month = value.substr(10, 2)
  // 身份证日
  const date = value.substr(12, 2)
  // 身份证日期时间戳date
  const time = Date.parse(month + '-' + date + '-' + year)
  // 当前时间戳
  const now_time = Date.parse(new Date())
  // 身份证当月天数
  const dates = (new Date(year, month, 0)).getDate()
  if (time > now_time || date > dates) {
    callback(new Error('出生日期不合规'))
    return { 'status': 0, 'msg': '出生日期不合规' }
  }
  // 校验码判断
  // 系数
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码对照表
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const id_array = value.split('')
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    callback(new Error('身份证校验码不合规'))
    return { 'status': 0, 'msg': '身份证校验码不合规' }
  }
  callback()
  return { 'status': 1, 'msg': '校验通过' }
}

/**
 * 手机号验证方法
 * @param rule
 * @param value
 * @param callback
 */
export function validateTelephone(rule, value, callback) {
  if (value === '') {
    callback()
  } else if (value.length !== 11) {
    callback(new Error('手机号必须为 11 位'))
  } else {
    callback()
  }
}

/**
 * 警号验证方法
 * @param rule
 * @param value
 * @param callback
 */
export function validatePolicecode(rule, value, callback) {
  const format = /^\d{6}$/
  // 警号规则校验
  if (value.length > 0) {
    if (!format.test(value)) {
      callback(new Error('警号不合规'))
      return { 'status': 0, 'msg': '警号不合规' }
    } else {
      callback()
    }
  } else {
    callback()
  }
}

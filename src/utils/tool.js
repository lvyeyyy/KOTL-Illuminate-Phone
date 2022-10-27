import store from '../store'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 格式化时间
 * @param {number|string} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (isNaN(time)) {
    return ''
  }
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      (d.getFullYear() === new Date(now).getFullYear() ? '' : d.getFullYear() + '年') +
      (d.getMonth() + 1) +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时'
      // +
      // d.getMinutes() +
      // '分'
    )
  }
}
/**
 * 时间范围选择器的预设范围
 * @type {{shortcuts: *[]}}
 */
export const datePeriodPickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近两个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

/**
 * 格式化角色用户列表
 * @param groupUserList{array} 角色用户列表
 * @param setType{boolean} 集合运算规则：false 为并集（默认），true 为交集
 * @returns {*[]}
 */
export function formatGroupUserList(groupUserList, setType = false) {
  let tempList
  if (groupUserList?.length > 1) {
    // 并集（合并后去重）
    if (!setType) {
      tempList = groupUserList.map(a => a.users).reduce((a, b) => a.concat(b))
      const hash = {}
      // 根据 operdm 去重
      tempList = tempList.reduce((pre, cur) => {
        if (!hash[cur.operdm]) {
          hash[cur.operdm] = true
          pre.push(cur)
        }
        return pre
      }, [])
    } else {
      // 交集（取相同部分）
      // 如果至少有一个数组为空，则交集为空，直接返回
      if (!groupUserList.map(a => a.users.length !== 0).reduce((a, b) => a && b)) {
        tempList = []
      } else {
        const hash = {}
        tempList = groupUserList.map(a => a.users).reduce((a, b) => a.concat(b)).reduce(function (pre, cur) {
          hash.hasOwnProperty(cur.operdm) ? pre.push(cur) : hash[cur.operdm] = true
          return pre
        }, [])
      }
    }
  } else if (groupUserList?.length === 1) {
    tempList = groupUserList[0].users
  } else {
    tempList = []
  }
  return tempList
}
/**
 * 时间选择器的限制方法，只能选择之前的时间，不能选择未来的时间。
 * @type {{disabledDate(*): *}}
 */
export function disabledDate(time) {
  return time.getTime() > Date.now()
}
/**
 * 判断用户是否拥有目标角色数组中的任一目标角色至少一个（）
 * @param aimsRoles{Number} 目标角色数组
 * @returns {Boolean}
 */
export function hasRoles(...aimsRoles) {
  aimsRoles.push(store.getters.ROLES_TYPE.ADMIN)
  return aimsRoles.some(aimsRole => store.getters.roles.some(role => parseInt(role.groupid) === aimsRole))
}
/**
 * 根据身份证获取性别
 * @param idCode
 * @returns {string|number}
 */
const genderValue = { maleValue: 1, femaleValue: 2, unknownGenderValue: 3 }
export function getSexByIdCode(idCode) {
  if (idCode.length === 18) {
    return idCode.substr(16, 1) % 2 === 1 ? genderValue.maleValue : genderValue.femaleValue
  } else {
    return ''
  }
}
/**
 * 根据身份证获取生日
 * @param idCode
 * @returns {string}
 */
export function getBirthdayByIdCode(idCode) {
  return idCode.length === 18 ? new Date(idCode.substr(6, 4) + '-' + idCode.substr(10, 2) + '-' + idCode.substr(12, 2)) : ''
}

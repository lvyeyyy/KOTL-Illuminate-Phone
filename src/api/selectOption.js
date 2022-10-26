import request from '../utils/request'
import Qs from 'qs'

/**
 * 根据角色ID列表获取相对应的人员列表
 * @param groupIdList{array}
 * @returns {Promise}
 */
export function getPeopleListByGroupIdList(groupIdList = [], jdzy) {
    return request({
        url: '/option/getGroupUser',
        method: 'get',
        params: { groupIds: groupIdList, jdzy: jdzy },
        // get 如果需要传递数组参数，使用Qs库对其进行格式化
        // https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays
        paramsSerializer(params) {
            return Qs.stringify(params)
        }
    })
}

/**
 * 获取案件性质下拉列表
 */
export function getAllCaseNatureSelectOption() {
    return request({
        url: '/option/getajxz',
        method: 'get'
    })
}

/**
 * 获取案件类型下拉列表
 */
export function getAllCaseTypeSelectOption() {
    return request({
        url: '/option/getAjLx',
        method: 'get'
    })
}

/**
 * 获取样本类别下拉列表
 */
export function getAllSampleTypeSelectOption(jdzy) {
    return request({
        url: '/option/getYbLx',
        method: 'get',
        params: { jdzy }
    })
}
/**
 * 获取全部的区域下拉列表
 */
export function getAllUnitSelectOption() {
    return request({
        url: '/option/getAllArea',
        method: 'get'
    })
}
/**
 * 获取外来进修人员历年文件
 * @param postfix
 * @returns {Promise}
 */
export function getgroupuserbyzydw(groupIds = [], jdzy, jddw) {
    return request({
        url: '/option/getgroupuserbyzydw',
        method: 'get',
        params: { groupIds: groupIds, jdzy: jdzy, jddw: jddw },
        paramsSerializer: function (params) {
            return Qs.stringify(params)
        }
    })
}
// 获取职务类型
export function getduty() {
    return request({
        url: '/option/getduty',
        method: 'get'
    })
}
// 获取证件类型
export function getcardtype() {
    return request({
        url: '/option/getcardtype',
        method: 'get'
    })
}
/**
 * 获取全部的鉴定专业
 */
export function getAllIdentificationTypeSelectOption() {
    return request({
        url: '/option/getAllJdZy',
        method: 'get'
    })
}
/**
 * 获取全部的鉴定类别
 * @param jdzy
 */
export function getAllJdLbByJdZy(jdzy) {
    return request({
        url: '/option/getJdLbByJdZy',
        method: 'get',
        params: { jdzy }
    })
}
/**
 * 获取全部的鉴定子类别
 * @param jdlb
 */
export function getAllJdZLb(jdlb) {
    return request({
        url: '/option/getJdProject',
        method: 'get',
        params: { jdlb }
    })
}
/**
 * 获取鉴定要求下拉列表
 * @returns {Promise}
 */
export function getIdentificationRequirementsList() {
    return request({
        url: '/option/getJdYqList',
        method: 'get'
    })
}
/**
 * 获取鉴定要求
 * @param JDProject
 */
export function getJdYq(JDProject) {
    return request({
        url: '/option/getJdYq',
        method: 'get',
        params: { JDProject }
    })
}
/**
 * 获取检材数量单位下拉列表
 */
export function getNumberUnitSelectOption() {
    return request({
        url: '/option/getNumberUnit',
        method: 'get'
    })
}

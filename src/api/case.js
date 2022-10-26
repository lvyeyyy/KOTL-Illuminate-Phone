import request from '@/utils/request'

/**
 * 获取案件信息
 * @param caseID
 */
export function getCaseInfoByCaseID(caseID) {
    return request({
        url: '/ajHandler/getCaseInfoByCaseID',
        method: 'get',
        params: { caseID }
    })
}
/**
 * 更新案件
 * @param data
 * @returns {Promise}
 */
export function updateCase(data) {
    return request({
        url: '/ajHandler/updateAj',
        method: 'post',
        data
    })
}
/**
 * 从现勘服务读取案件和物证信息
 * @param {Array} imgIdList
 * @returns {Promise}
 */
export function ajxxreadxcserver(obj) {
    return request({
        url: `/ajhandler/ajxxreadxcserver?mType=${obj.mType}&kindId=${obj.kindId}&wtTd=${obj.wtTd}`,
        method: 'post'
    })
}

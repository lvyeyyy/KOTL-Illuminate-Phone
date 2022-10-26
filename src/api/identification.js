import request from '@/utils/request'
/**
 * 获取提取列表
 * @param data
 * @returns {Promise}
 */
export function getInspectionList(data) {
    return request({
        url: '/inspection/acquireAppraisementList',
        method: 'post',
        data
    })
}
/**
 * 根据提取编号获取进样列表
 * @param appraisementId 提取编号
 * @returns {Promise}
 */
export function acquireInspectInstrumentConclusion(appraisementId) {
    return request({
        url: '/inspection/acquireInspectYqSbConclusion',
        method: 'post',
        params: { appraisementId: appraisementId }
    })
}
/**
 * 根据委托编号查询最终结论
 * @param entrustId
 * @returns {Promise}
 */
export function acquireFinallyConclusion(entrustId) {
    return request({
        url: '/inspection/acquireFinallyConclusion',
        method: 'post',
        params: { wtId: entrustId }
    })
}

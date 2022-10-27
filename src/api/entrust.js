import request from '@/utils/request'
/**
 * 根据委托编号获取委托详细信息
 * @param WtID
 */
export function getEntrustInfoByEntrustID(WtID) {
  return request({
    url: '/wtHandler/acquireWtByWtID',
    method: 'get',
    params: { WtID }
  })
}
/**
 * 获取发文号
 * @param entrustId
 * @returns {Promise}
 */
export function getpostxhbywtid(entrustId) {
  return request({
    url: '/wtHandler/getpostxhbywtid',
    method: 'post',
    params: { wtid: entrustId }
  })
}
/**
 * 更新委托的审核状态
 * @param entrustId 委托编号
 * @param auditStatus 审核状态
 * @param auditStep 审核步骤
 * @param imgid 签名图片ID
 * @param auditOpinion 审核意见
 * @returns {Promise}
 */
export function updateAuditStatusByEntrustId(entrustId, auditStatus, auditStep, imgid = 0, auditOpinion = '', auditfailedreason = '', firstmemo, secondmemo, authmemo, isSign, posT_XH) {
  return request({
    url: '/wtHandler/updateAuditStatusByWtId',
    method: 'post',
    data: {
      wtId: entrustId,
      auditStatus: auditStatus,
      auditStep: auditStep,
      imgid: imgid,
      approveOpinion: auditOpinion,
      auditfailedreason: auditfailedreason,
      firstmemo: firstmemo,
      secondmemo: secondmemo,
      authmemo: authmemo,
      isSign: isSign,
      posT_XH: posT_XH
    }
  })
}
// 获取是否需要领导pin审核
export function getpin() {
  return request({
    url: '/option/getpin',
    method: 'get'
  })
}
/**
 * 上传图片
 * @param data
 * @returns {Promise}
 */
export function uploadImage(data) {
  return request({
    url: '/jcYbHandler/uploadYbImage',
    method: 'post',
    data
  })
}
/**
 * 获取该委托需要下的文书
 * @param {*} entrustId 委托ID
 */
export function queryDocument(entrustId, step) {
  return request({
    url: '/word/queryDocument',
    method: 'get',
    params: { entrustId, step }
  })
}
// 删除文书
export function deletehistory(wslsId, flag) {
  return request({
    url: '/word/deletehistory',
    method: 'DELETE',
    params: { wslsId: wslsId, flag: flag }
  })
}
/**
 * 查询获取委托列表
 * @param data
 */
export function getEntrustList(data) {
  return request({
    url: '/wtHandler/acquireWtInfo',
    method: 'post',
    data
  })
}
/**
 * 更新委托信息
 * @param data
 */
export function updateEntrust(data) {
  return request({
    url: '/wtHandler/updateWt',
    method: 'post',
    data
  })
}
/**
 * 根据委托编号查询被鉴定人详细列表
 * @param WTID
 */
export function getAppraisedPeopleListByEntrustID(WTID) {
  return request({
    url: '/bjdrHandler/acquireBjdrByWTID',
    method: 'get',
    params: { WTID }
  })
}
/**
 * 查询单个被鉴定人的详细信息
 * @param BJDRID
 */
export function getBjdrInfoByID(BJDRID) {
  return request({
    url: '/bjdrHandler/getBJDRByBJDRID',
    method: 'get',
    params: { BJDRID }
  })
}
/**
 * 修改被鉴定人信息
 * @param data
 */
export function updateAppraisedPeople(data) {
  return request({
    url: '/bjdrHandler/updateBjdr',
    method: 'post',
    data
  })
}
/**
 * 添加被鉴定人
 * @param data
 */
export function addAppraisedPeople(data) {
  return request({
    url: '/bjdrHandler/addBjdr',
    method: 'post',
    data
  })
}
/**
 * 删除被鉴定人
 * @param BJDRID
 * @param WTID
 */
export function deleteAppraisedPeople(BJDRID, WTID) {
  return request({
    url: '/bjdrHandler/deleteBjdr',
    method: 'delete',
    params: { BJDRID: BJDRID, WTID: WTID }
  })
}
/**
 * 获取委托的检验报告信息
 * @param wtid
 */
export function getEntrustWordDataByEntrustId(wtid) {
  return request({
    url: '/word/word',
    method: 'get',
    params: { wtid }
  })
}
/**
 * 更新委托状态
 * @param entrustId
 * @param preAuditStatus
 * @param ldOpinion
 * @returns {Promise}
 */
export function updateAuditWt(entrustId, preAuditStatus) {
  return request({
    url: '/wtHandler/preAuditWt',
    method: 'post',
    params: { wtId: entrustId, preAuditStatus: preAuditStatus }
  })
}
/**
 * 根据委托编号查询检材详细列表
 * @param WtID
 * @returns {Promise}
 */
export function getSampleListByEntrustID(WtID, ISYB) {
  return request({
    url: '/jcYbHandler/acquireJcYbByWTID',
    method: 'get',
    params: { WtID: WtID, ISYB: ISYB }
  })
}
/**
 * 根据检材编号获取检材信息
 * @param JcYbID
 * @returns {Promise}
 */
export function getSampleInfoBySampleID(JcYbID) {
  return request({
    url: '/jcYbHandler/getJcYbByJcYbID',
    method: 'get',
    params: { JcYbID: JcYbID }
  })
}
/**
 * 根据委托编号获取受理信息
 * @param WTID
 */
export function getAcceptInfoByEntrustId(WTID) {
  return request({
    url: '/wtHandler/acquireSlInfo',
    method: 'get',
    params: { WTID }
  })
}
/**
 * 删除检材
 * @param JcYbID
 * @param WtID
 * @returns {Promise}
 */
export function deleteSample(JcYbID, WtID) {
  return request({
    url: '/jcYbHandler/deleteJcYb',
    method: 'delete',
    params: { JCYBID: JcYbID, WTID: WtID }
  })
}
/**
 * 修改检材
 * @param data
 * @returns {Promise}
 */
export function updateSample(data) {
  return request({
    url: '/jcYbHandler/updateJcYb',
    method: 'post',
    data
  })
}
/**
 * 增加检材
 * @param data
 * @returns {Promise}
 */
export function addSample(data) {
  return request({
    url: '/jcYbHandler/addJcYb',
    method: 'post',
    data
  })
}

import request from '../utils/request'

// 新增——修改鉴定文书 DY
export function add_modifyword(data) {
  return request({
    url: '/word/add_modifyword',
    method: 'post',
    data
  })
}

// 修改——修改鉴定文书 DY
export function update_modifyword(data) {
  return request({
    url: '/word/update_modifyword',
    method: 'post',
    data
  })
}

// 删除——修改鉴定文书 DY
export function delete_modifyword(id) {
  return request({
    url: '/word/delete_modifyword',
    method: 'post',
    params: { id }
  })
}

// 查询——修改鉴定文书 DY
export function acquiremodifyword(data) {
  return request({
    url: '/word/acquiremodifyword',
    method: 'post',
    data
  })
}
/**
 * 不予通过补发或修改文书
 * @param {*} entrustId 主键id
 */
export function notpass_modifyword(id, notPassStep, reason, sendFlag) {
  return request({
    url: '/word/notpass_modifyword',
    method: 'post',
    params: {
      id: id,
      notPassStep: notPassStep,
      reason: reason,
      sendFlag: sendFlag
    }
  })
}

/**
 * 发送短信
 * @param {*} entrustId 主键id
 */
export function sendsms_modifyword(id) {
  return request({
    url: '/word/sendsms_modifyword',
    method: 'post',
    params: {
      id: id
    }
  })
}

/**
 * 查询文书模板
 * @param {*} entrustId 委托ID
 */
export function getdocumentbywslb(entrustId, WSLB, IsEdit) {
  return request({
    url: '/word/getdocumentbywslb',
    method: 'get',
    params: {
      entrustId, WSLB, IsEdit
    }
  })
}

/**
 * 获取该委托需要下的文书
 * @param {*} ID 申请表主键ID
 */
export function modifyapproval(ID) {
  return request({
    url: '/word/modifyapproval',
    method: 'get',
    params: { ID }
  })
}

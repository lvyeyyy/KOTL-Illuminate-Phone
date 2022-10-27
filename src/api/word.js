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

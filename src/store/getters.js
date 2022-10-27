const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  token2: state => state.user.token2,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  jdzy: state => state.user.jdzy,
  roles: state => state.user.roles,
  // 用户专业类型
  MAJOR_TYPE: state => state.constants.MAJOR_TYPE,
  // 用户角色类型
  ROLES_TYPE: state => state.constants.ROLES_TYPE,
  // 审核状态
  AUDIT_STATUS: state => state.constants.AUDIT_STATUS,
  AUDIT_STEP: state => state.constants.AUDIT_STEP,
  // 文书生成步骤
  DOCUMENT_STEP: state => state.constants.DOCUMENT_STEP,
  // 检验方预审核状态
  PRE_AUDIT_STATUS: state => state.constants.PRE_AUDIT_STATUS,
  // 受理状态
  ACCEPT_STATUS: state => state.constants.ACCEPT_STATUS,
  // 发文状态
  POST_STATUS: state => state.constants.POST_STATUS
}
export default getters

const state = {

  // 鉴定专业
  MAJOR_TYPE: {
    // 法医 701
    FY: '1701',
    // DNA 702
    DNA: '1702',
    // 电子物证 703
    DZWZ: '1703',
    // 痕迹 704
    HJ: '1704',
    // 文检 705
    WJ: '1705',
    // 声纹 706
    SW: '1706',
    // 理化 2
    LH: '2',
    // 技管
    JG: '1930'
  },

  /**
   * 审核状态
   */
  AUDIT_STATUS: {
    // 未提交审核
    NOT: -2,
    // 审核不通过
    FAILED: -1,
    // 待审核
    PENDING: 0,
    // 审核通过
    PASSED: 1
  },

  /**
   * 审核步骤
   */
  AUDIT_STEP: {
    // 未提交
    NOT: -1,
    // 复核
    REVIEW: 0,
    // 一审
    FIRST: 1,
    // 二审
    SECOND: 2,
    //  授权签字人
    THIRD: 3,
    //  领导
    FORTH: 4,
    // 三审
    THREE: 5,
    // 程序审核人
    PROCESSAUDITOR: 6
  },

  /**
   * 文书生成步骤
   */
  DOCUMENT_STEP: {
    NONE: 0,
    // 委托步骤
    ENTRUST: 1,
    // 受理步骤
    ACCEPT: 2,
    // 检验
    INSPECT: 4,
    // 审核步骤
    AUDIT: 8,
    // 发文步骤
    POST: 16
  },
  PRE_AUDIT_STATUS: {
    // 未通过检验方预审核
    FAILED: -1,
    // 未提交预审核
    NOT: 0,
    // 已提交预审核（待预审核）
    PENDING: 1,
    // 预审核通过
    PASSED: 2
  },
  ROLES_TYPE: {
    // 领导 1
    LEADER: 1,
    // 系统管理员 2
    ADMIN: 2,
    // 授权签字人 3
    AUTHORIZED_SIGNATORY: 3,
    // 委托人 4
    ENTRUST_PERSON: 4,
    // 受理人 5
    ACCEPT_PERSON: 5,
    // 检验人 6
    INSPECTORS: 6,
    // 审核人 9
    REVIEWER: 9,
    // 测试角色 15
    TESTER: 15,
    // 仪器管理员 16
    INSTRUMENT_ADMINISTRATOR: 16,
    // 耗材管理员 17
    MATERIAL_ADMINISTRATOR: 17,
    // 标样管理员 18
    EXAMPLE_ADMINISTRATOR: 18,
    // 方法管理员 19
    METHOD_ADMINISTRATOR: 19,
    // 经费管理员 20
    PURCHASE_ADMINISTRATOR: 20,
    // 委托方领导
    ENTRUST_LEADER: 21,
    // 采购单管理员
    ORDER_ADMINISTRATOR: 22,
    // 外来人员
    FOREIGN_PERSONNEL: 23,
    // 专业管理员
    PROFESSIONAL_ADMINISTRATOR: 24
  },
  /**
   * 受理状态
   */
  ACCEPT_STATUS: {
    // 不予受理
    FAILED: -1,
    // 待受理
    PENDING: 0,
    // 受理成功
    PASSED: 1
  },
  /**
   * 发文状态
   */
  POST_STATUS: {
    // 不予发文
    FAILED: -1,
    // 待发文
    PENDING: 0,
    // 已经发文
    PASSED: 1
  }
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

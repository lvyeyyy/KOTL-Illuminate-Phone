import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/entrust/audit',
    name: 'entrust-module',
    component: () => import('../views/audit/newPhone'),
    meta: { title: '手机审核', icon: 'audit' }
  },
  {
    path: '/audit/list',
    name: 'audit-list',
    component: () => import('../views/audit/list'),
    meta: { title: '预审核列表', icon: 'audit' }
  },
  {
    path: '/caselist',
    name: 'inspect-caselist',
    component: () => import('../views/inspectResult/caselist'),
    meta: { title: '案件列表(检验结果)', icon: 'audit' }
  },
  {
    path: '/samplelist',
    name: 'inspect-samplelist',
    component: () => import('../views/inspectResult/samplelist'),
    meta: { title: '检材列表(检验结果)', icon: 'audit' }
  },
  {
    path: '/preaudit/ajinfo',
    name: 'preaudit-ajinfo',
    component: () => import('../views/preAudit/index'),
    meta: { title: '确认案件信息', icon: 'audit' }
  },
  // {
  //   path: '/preaudit/ajinfotemp',
  //   name: 'preaudit-ajinfotemp',
  //   component: () => import('../views/preAudit/caseInfo'),
  //   meta: { title: '确认案件信息', icon: 'audit' }
  // },
  // {
  //   path: '/preaudit/wtinfo',
  //   name: 'preaudit-wtinfo',
  //   component: () => import('../views/preAudit/entrustInfo'),
  //   meta: { title: '确认委托信息', icon: 'audit' }
  // },
  // {
  //   path: '/preaudit/bdjrinfo',
  //   name: 'preaudit-wtinfo',
  //   component: () => import('../views/preAudit/bdjrInfo'),
  //   meta: { title: '确认被鉴定人信息', icon: 'audit' }
  // },
  // {
  //   path: '/preaudit/jcinfo',
  //   name: 'preaudit-jcinfo',
  //   component: () => import('../views/preAudit/jcInfo'),
  //   meta: { title: '确认检材信息', icon: 'audit' }
  // },
  // {
  //   path: '/preaudit/auditinfo',
  //   name: 'preaudit-auditinfo',
  //   component: () => import('../views/preAudit/auditInfo'),
  //   meta: { title: '审核信息', icon: 'audit' }
  // },
  {
    path: '/entrust/wtinfolist',
    name: 'entrust-wtinfolist',
    component: () => import('../views/entrust/list'),
    meta: { title: '委托列表', icon: 'audit' }
  }
  // {
  //   path: '/entrust/ajinfo',
  //   name: 'entrust-ajinfo',
  //   component: () => import('../views/entrust/index'),
  //   meta: { title: '案件信息', icon: 'audit' }
  // }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

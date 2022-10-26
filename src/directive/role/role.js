import store from '../../store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    value.push(store.getters.ROLES_TYPE.ADMIN)
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasRole = roles.map(a => parseInt(a.groupid)).some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-role="['admin','editor']"`)
    }
  }
}

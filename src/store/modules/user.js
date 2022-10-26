import { login, logout, getInfo, getUserPermissions } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    // 手机APP所需token
    token2: '',
    name: '',
    avatar: '',
    // 鉴定专业
    jdzy: '',
    // 角色分组
    roles: [],
    // 单位id
    xzdid: '',
    operdm: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKEN2: (state, token2) => {
    state.token2 = token2
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_JDZY: (state, jdzy) => {
    state.jdzy = jdzy
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_XZDID: (state, xzdid) => {
    state.xzdid = xzdid
  },
  SET_OPERDM: (state, operdm) => {
    state.operdm = operdm
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data.token)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        getUserPermissions().then(perResponse => {
          const { data } = response
          if (!data) {
            reject('验证失败，请重新登录。')
          }
          if (perResponse.data.length > 0) {
            data[0].permissions = perResponse.data[0].permissions.map(item => item.codename)
            data[0].roles = perResponse.data[0].groups
          } else {
            reject('用户没有配置任何角色，无法登录。')
          }
          const { operdm, jdzy, jdzylist, realname, sex, sfcode, cornet, telephone, avatar, certificate, signature, signatureid, roles, permissions, taglist, xzdid, xzdid_name } = data[0]
          commit('SET_OPERDM', operdm)
          commit('SET_JDZY', jdzy[0])
          commit('SET_JDZYLIST', jdzylist)
          commit('SET_NAME', realname)
          commit('SET_SEX', sex)
          commit('SET_SFCODE', sfcode)
          commit('SET_CORNET', cornet)
          commit('SET_TELEPHONE', telephone)
          commit('SET_AVATAR', avatar)
          commit('SET_ROLES', roles)
          commit('SET_CERTIFICATE', certificate)
          commit('SET_SIGNATURE', signature)
          commit('SET_SIGNATUREID', signatureid)
          commit('SET_PERMISSIONS', permissions)
          commit('SET_TAG_LIST', taglist)
          commit('SET_XZDID', xzdid)
          commit('SET_XZDID_NAME', xzdid_name)
          resolve(data[0])
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN2', '')
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN2', '')
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


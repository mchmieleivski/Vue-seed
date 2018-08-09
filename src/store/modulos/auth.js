const state = {
  usuario: null,
  token: null,
  grupos: null
}

const mutations = {
  SET_USUARIO (state, usuario) {
    state.usuario = usuario
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_GRUPOS (state, grupos) {
    state.grupos = grupos
  }
}

const actions = {
  setUsuario: ({commit}, userObj) => {
    commit('SET_USUARIO', userObj)
  },
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  },
  setGrupos: ({commit}, grupos) => {
    commit('SET_GRUPOS', grupos)
  }
}

const getters = {
  getUsuario (state) {
    return state.usuario
  },
  getGrupos (state) {
    return state.grupos
  }
}

export default {
  state, mutations, actions, getters
}

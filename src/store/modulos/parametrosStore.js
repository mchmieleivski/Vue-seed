import Vue from 'vue'
import {getParametros} from './../../paths'

const state = {
  parametros: []
}

const mutations = {
  SET_PARAMETROS (state, parametro) {
    state.parametros = parametro
  }
}

const actions = {
  cargarParametros: ({commit}) => {
    Vue.http.get(getParametros).then(response => {
      commit('SET_PARAMETROS', response.data)
    })
  }
}

const getters = {
  getParametrosTodos (state) {
    return state.parametros
  },
  getParametrosCompania (state) {
    return state.parametros.filter(p => {
      return p.parName === 'MUN_COMPANIA'
    })
  },
  getParametrosPeriodo (state) {
    return state.parametros.filter(p => {
      return p.parName === 'MUN_PERIODO'
    })
  },
  getParametrosFormaPago (state) {
    return state.parametros.filter(p => {
      return p.parName === 'MUN_FORMA_PAGO'
    })
  },
  getParametrosEstados (state) {
    return state.parametros.filter(p => {
      return p.parName === 'MUN_ESTADOS'
    })
  },
  getParametrosInformacionAdicional (state) {
    return state.parametros.filter(p => {
      return p.parName === 'MUN_INFORMACION_ADICIONAL'
    })
  }
}

export default {
  state, mutations, actions, getters
}

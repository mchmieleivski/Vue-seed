import Vue from 'vue'
import Vuex from 'vuex'
import parametros from './modulos/parametrosStore'
import paises from './modulos/paisesStore'
import auth from './modulos/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'development', // eslint-disable-line
  modules: {
    parametros,
    paises,
    auth
  }
})
export default store

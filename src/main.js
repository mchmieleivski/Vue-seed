// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueToastr from '@deveodk/vue-toastr'
import VueProgressBar from 'vue-progressbar'
import Componentes from 'componentes-vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
// Componentes
import SelectUbicaccion from './components/util/selectUbicaccion'
import BotonBuscar from './components/util/BotonBuscar'
import BotonGuardar from './components/util/BotonGuardar'
import Boton from './components/util/Boton'
import BotonEditar from './components/util/BotonEditar'
import BotonEliminar from './components/util/BotonEliminar'
import BotonNuevo from './components/util/BotonNuevo'
import Tabla from './components/util/Tabla'
// Directivas
import {directivaError, directivaPermiso} from './util/directivas'
// CSS
import 'flatpickr/dist/themes/material_blue.css'
import 'componentes-vue/dist/componentes-vue.min.css'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

/* CARGA LOS DATOS DEL USUARIO AL CACHE */
/* if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
  store.dispatch('setToken', window.localStorage.getItem('token'))
  store.dispatch('setUsuario', window.localStorage.getItem('usuario'))
  // eslint-disable
  let isValid = KJUR.jws.JWS.verifyJWT(window.localStorage.getItem('token'), {b64: process.env.CODE_TOKEN}, {alg: ['HS256']})
  if (isValid) {
    // eslint-disable
    let payloadObj  = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(window.localStorage.getItem('token').split(".")[1]));
    store.dispatch('setGrupos', payloadObj.grupos)
  } else {
    router.push('/pages/login')
  }
} else {
  router.push('/pages/login')
} */

// Componentes
Vue.component('selectUbicaccion', SelectUbicaccion)
Vue.component('btn-buscar', BotonBuscar)
Vue.component('btn-gr', BotonGuardar)
Vue.component('btn', Boton)
Vue.component('btn-ed', BotonEditar)
Vue.component('btn-el', BotonEliminar)
Vue.component('btn-nv', BotonNuevo)
Vue.component('tabla', Tabla)
Vue.use(BootstrapVue)
// import {getPaises, getProvincias, getDepartamentos, getLocalidades} from './util/paths'
Vue.use(Componentes,
  { pais: 'asd',
    provincia: 'asd',
    departamento: 'asd',
    localidad: 'asd'
  },
  store)
Vue.use(VueToastr, {
  defaultPosition: 'toast-top-center'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvaZN9QijRtjwMWf4IyG5fiWDj46rOJDw',
    libraries: 'places,visualization'
  }
})

/* PROGRESS BAR */
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

/* HTTP REQUESTS */
Vue.prototype.$http = axios
axios.interceptors.request.use(function (config) {
  config.headers['Accept'] = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  // config.headers['TEST'] = 'TEST'
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  if (response.status === 200 && response.headers.mensaje) {
    Vue.prototype.$toastr('success', response.headers.mensaje, 'Exito')
  } else if (response.status !== 200) {
    Vue.prototype.$toastr('error', 'Se produjo un error. Contacte con el administrador.', 'Error')
  }
  return response
}, function (error) {
  Vue.prototype.$toastr('error', 'Se produjo un error. Contacte con el administrador.', 'Error')
  return Promise.reject(error)
})

/* DIRECTIVAS */
Vue.directive('error', directivaError)
Vue.directive('permiso', directivaPermiso)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

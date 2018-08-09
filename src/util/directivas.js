import {poseePermiso} from './permisos.js'

export const directivaError = {
  bind (el, binding) {
    if (binding.value.form !== undefined) {
      if (binding.value.form.errors.has(binding.value.campo)) {
        el.className += el.className.indexOf('has-danger') < 0 ? ' has-danger' : ''
      } else {
        el.className = el.className.replace('has-danger', '')
      }
    }
  }
}
export const directivaPermiso = {
  bind (el, binding) {
    let flag = poseePermiso(binding.value.funcionalidad, binding.value.permiso)
    if (!flag) {
      el.style.display = 'none'
    }
  }
}

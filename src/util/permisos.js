import store from './../store/'

export function poseePermiso (funcionalidad, permiso) {
  let grupos = store.getters.getGrupos
  let funcion = 'permisoVer'
  if (permiso) {
    funcion = 'permiso' + permiso
  }
  if (grupos) {
    let flag = false
    grupos.map(grupo => {
      grupo.funcionalidadGrupos.map(funcionalidadGrupo => {
        if (funcionalidadGrupo.funcionalidad.nombre === funcionalidad) {
          if (funcionalidadGrupo[funcion]) {
            flag = true
          }
        }
      })
    })
    return flag
  }
}

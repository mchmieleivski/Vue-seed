<template>
  <div class="animated fadeIn">
  
    <btn-el :haciendo="buscando" @click="data = []"></btn-el>
    
    <btn-el :haciendo="buscando" label="permisos" v-permiso="{funcionalidad:'usuario',permiso:'Ver'}"></btn-el>

    <!-- <router-link append :to="'nuevo'" class="btn btn-success btn-sm float-right"><i class="fa fa-plus"></i> Nuevo</router-link> -->
         
    <btn-nv :haciendo="buscando" @click="modalAlta = true" class="float-right"></btn-nv>


    <filtro :buscando="buscando" @buscar="buscar"></filtro>


    <tabla titulo="Usuarios" :buscando="buscando" :data="data" :columnas="columnas" :titulos="titulos" :acciones="acciones" :paginacion="paginacion" @consultar="consultar" @editar="editar" @eliminar="eliminar"></tabla>


    <b-modal title="Modal title" v-model="modalAlta" @ok="modalAlta = false">
      FORMULARIO MAGICO
    </b-modal>
    <b-modal title="Eliminar Usuario" v-model="modalEliminar" @ok="confimrarEliminarUsuario" ok-title="Si" close-title="Cancelar">¿ Está seguro que desea eliminar este usuario ?
    </b-modal>
  </div>
</template>
<script>
import flatpickConfig from '@/util/flatpickConfig'
import paginacionConfig from '@/util/paginacionConfig'
import {getUsers} from './../../paths'
import Filtro from './Filtro'

export default {
  name: 'test-listado',
  components: {
    Filtro
  },
  mixins: [flatpickConfig, paginacionConfig],
  data () {
    return {
      modalAlta: false,
      modalEliminar: false,
      idUsuarioEliminar: 0,
      buscando: false,
      data: [],
      columnas: [
        'name', 'email', 'phone', 'company.name'
      ],
      titulos: [
        'Nombre', 'Email', 'Telefono', 'Compania'
      ],
      acciones: [
        {name: 'consultar', label: '', icon: 'fa fa-eye', class: 'btn btn-info', idData: 'id'},
        {name: 'editar', label: '', icon: 'fa fa-edit', class: 'btn btn-warning', idData: 'id'},
        {name: 'eliminar', label: '', icon: 'fa fa-remove', class: 'btn btn-danger', idData: 'id'}
      ],
      filtros: {
        idPais: -1,
        idProvincia: -1,
        idDepartamento: -1,
        idLocalidad: -1,
        fecha: null,
        codigo: null
      }
    }
  },
  methods: {
    buscar (filtros) {
      if (filtros !== null) {
        this.filtros = filtros
      }
      this.buscando = true
      this.$http.get(getUsers, { params: this.filtros }).then(response => {
        this.data = response.data
        this.buscando = false
      })
    },
    eliminar (idData) {
      this.idUsuarioEliminar = idData
      this.modalEliminar = true
    },
    confimrarEliminarUsuario () {
      this.$http.delete(getUsers + '/' + this.idUsuarioEliminar).then(response => {
        this.buscar(null)
      })
    },
    consultar (idData) {
      alert('consulto ' + idData)
    },
    editar (idData) {
      alert('edito ' + idData)
    }
  },
  mounted () {
    // this.buscar(null)
  }
}
</script>

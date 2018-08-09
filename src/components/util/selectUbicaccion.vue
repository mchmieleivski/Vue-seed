<template>
<div class="row">
    <div :class="classSelect">
      <label style="margin-bottom: 0px;">País</label>
      <p class="input-group input-group-sm" style="width: 100%;">
        <select 
        class="form-control form-control-sm" 
        name="pais" 
        v-model="paisSelect"
        @change="cambiaPais()">
          <option value="-1" v-if="esFiltro">Todas</option>
          <option value="null" v-if="!esFiltro" disabled="true">Seleccione...</option>
          <option :value="pais.paiCodigo" v-for="pais in getPaisesTodos">{{pais.paiNombre}}</option>
        </select>
      </p>
    </div>
    <div :class="classSelect">
      <label style="margin-bottom: 0px;">Provincia</label>
      <p class="input-group input-group-sm" style="width: 100%;">
        <select
        class="form-control form-control-sm" 
        name="provincia" 
        v-model="provinciaSelect"
        @change="cambiaProvincia()">
          <option value="-1" v-if="esFiltro">Todas</option>
          <option value="null" v-if="!esFiltro" disabled="true">Seleccione...</option>
          <option :value="provincia.prvCodigo" v-for="provincia in provincias">{{provincia.nombre}}</option>
        </select>
      </p>
    </div>
    <div :class="classSelect">
      <label style="margin-bottom: 0px;">Departamento</label>
      <p class="input-group input-group-sm" style="width: 100%;">
        <select 
        class="form-control form-control-sm" 
        name="Departamento"
        v-model="departamentoSelect"
        @change="cambiaDepartamento()">
          <option value="-1" v-if="esFiltro">Todas</option>
          <option value="null" v-if="!esFiltro" disabled="true">Seleccione...</option>
          <option :value="departamento.depCodigo" v-for="departamento in departamentos">{{departamento.nombre}}</option>
        </select>
      </p>
    </div>
    <div :class="[classSelect, esError ? classError: '']">
      <label style="margin-bottom: 0px;">Localidad</label>
      <p class="input-group input-group-sm" style="width: 100%;">
        <select 
        class="form-control form-control-sm" 
        name="Localidad"
        v-model="localidadSelect"
        @change="cambiaLocalidad()">
          <option value="-1" v-if="esFiltro">Todas</option>
          <option value="null" v-if="!esFiltro" disabled="true">Seleccione...</option>
          <option :value="localdiad.locCodigo" v-for="localdiad in localidades">{{localdiad.nombre}}</option>
        </select>
      </p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {getProvincias, getDepartamentos, getLocalidades} from './../../paths'

  export default{
    name: 'selectUbicaccion',
    props: {
      esFiltro: {
        type: Boolean,
        required: true
      },
      classSelect: {
        type: String,
        required: false,
        default: 'col-3'
      },
      idLocalidad: {
        type: Number,
        required: false,
        default: null
      },
      classError: {
        type: String,
        required: false,
        default: 'has-danger'
      },
      esError: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        paisSelect: null,
        provinciaSelect: null,
        departamentoSelect: null,
        localidadSelect: null,
        provincias: [],
        departamentos: [],
        localidades: []
      }
    },
    methods: {
      cambiaPais () {
        if (this.paisSelect && this.paisSelect !== null && this.paisSelect !== -1) {
          this.$http.get(`${getProvincias}?pais_id=${this.paisSelect}`).then(response => {
            this.provincias = response.data
          })
        } else {
          this.provincias = []
        }
        this.$emit('paisSeleccionado', this.paisSelect)
        this.provinciaSelect = this.esFiltro ? -1 : null
        this.departamentoSelect = this.esFiltro ? -1 : null
        this.localidadSelect = this.esFiltro ? -1 : null
      },
      cambiaProvincia () {
        if (this.provinciaSelect !== null && this.provinciaSelect !== -1) {
          this.$http.get(`${getDepartamentos}?provincia_id=${this.provinciaSelect}`).then(response => {
            this.departamentos = response.data
          })
        } else {
          this.departamentos = []
        }
        this.$emit('provinciaSeleccionada', this.provinciaSelect)
        this.departamentoSelect = this.esFiltro ? -1 : null
        this.localidadSelect = this.esFiltro ? -1 : null
      },
      cambiaDepartamento () {
        if (this.departamentoSelect !== null && this.departamentoSelect !== -1) {
          this.$http.get(`${getLocalidades}?departamento_id=${this.departamentoSelect}`).then(response => {
            this.localidades = response.data
          })
        } else {
          this.localidades = []
        }
        this.$emit('departamentoSeleccionado', this.departamentoSelect)
        this.localidadSelect = this.esFiltro ? -1 : null
      },
      cambiaLocalidad () {
        this.$emit('localidadSeleccionada', this.localidadSelect)
      },
      cargarCombos () {
        this.$http.get(`${getLocalidades}getCompleto?id=${this.idLocalidad}`).then(response => {
          this.provincias = response.data.provincias
          this.departamentos = response.data.departamentos
          this.localidades = response.data.localidades
          this.paisSelect = response.data.idPais
          this.provinciaSelect = response.data.idProvincia
          this.departamentoSelect = response.data.idDepartamento
          this.localidadSelect = response.data.idLocalidad
        })
      }
    },
    computed: {
      ...mapGetters([
        'getPaisesTodos'
      ])
    },
    watch: {
      idLocalidad () {
        this.cargarCombos()
      },
      getPaisesTodos () {
        if (this.idLocalidad !== null) {
          this.cargarCombos()
        }
      }
    },
    created () {
      if (!this.esFiltro) {
        this.paisSelect = null
        this.provinciaSelect = null
        this.departamentoSelect = null
        this.localidadSelect = null
      } else {
        this.paisSelect = -1
        this.provinciaSelect = -1
        this.departamentoSelect = -1
        this.localidadSelect = -1
      }
    }
  }
</script>

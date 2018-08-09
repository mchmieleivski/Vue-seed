<template>
  <div class="row">    
    <div class="col-12 m-t-15">
      <div class="card">
        <div class="card-header">
          <h5>Filtros</h5>
        </div>
        <div class="card-block" @keyup.enter="buscar">
          <div class="row">
            <div class="col-12">
                           <select-ubicaccion :esFiltro="true" classSelect="col-md-3 col-sm-12"
              @paisSeleccionado="paisSeleccionado"
              @provinciaSeleccionada="provinciaSeleccionada"
              @departamentoSeleccionado="departamentoSeleccionado"
              @localidadSeleccionada="localidadSeleccionada">
              </select-ubicaccion>

            <div class="row">
              <div class="col-md-3">
                <label style="margin-bottom: 0px;">Código Sitio</label>
                <p class="input-group input-group-sm" style="width: 100%;">
                  <input maxlength="5" v-model="filtros.codigo" type="text" class="form-control" placeholder="Código sitio..."
                  />
                </p>
              </div>
              <div class="col-md-3">
                <label style="margin-bottom: 0px;">FECHA</label>
                <p class="input-group input-group-sm" style="width: 100%;">
                  <fecha :options="opcionesDatePicker" style="width: 100%;" placeholder="Fecha..." v-model="filtros.fecha"></fecha>
                </p>
              </div>
              <div class="col-6 text-right">
                <label style="margin-bottom: 0px;"></label>
                <p class="input-group input-group-sm" style="width: 100%;">
                  <btn-buscar :haciendo="buscando" @click="buscar"></btn-buscar>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import flatpickConfig from '@/util/flatpickConfig'

  export default {
    name: 'filtroMunicipios',
    mixins: [flatpickConfig],
    props: {
      buscando: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
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
      buscar () {
        this.$emit('buscar', this.filtros)
      },
      paisSeleccionado (id) {
        this.filtros.idPais = id
      },
      provinciaSeleccionada (id) {
        this.filtros.idProvincia = id
      },
      departamentoSeleccionado (id) {
        this.filtros.idDepartamento = id
      },
      localidadSeleccionada (id) {
        this.filtros.idLocalidad = id
      }
    }
  }
</script>
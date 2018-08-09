<template>
  <div class="animated fadeIn">
    <div class="col-md-3">
        <label style="margin-bottom: 0px;">FECHA</label>
        <p class="input-group input-group-sm" style="width: 100%;">
        <fecha :options="opciones2" style="width: 100%;" v-model="opciones3.minDate"></fecha>
        </p>
    </div>
    <div class="col-md-3">
        <label style="margin-bottom: 0px;">FECHA minima</label>
        <p class="input-group input-group-sm" style="width: 100%;">
        <fecha :options="opciones3" style="width: 100%;" v-model="opciones2.maxDate"></fecha>
        </p>
    </div>   
    <div>
    <button @click="buscando = !buscando">CLICKME</button>
      <btn-buscar :haciendo="buscando" @click="buscar"></btn-buscar>
      <btn-gr :haciendo="buscando"></btn-gr>
      <btn :haciendo="buscando"></btn>
      <btn-ed :haciendo="buscando"></btn-ed>
      <btn-el :haciendo="buscando"></btn-el>
      <btn-nv :haciendo="buscando" @click="modalAlta = true"></btn-nv>
    </div>
    <b-modal title="Modal title" v-model="modalAlta" @ok="modalAlta = false">
    </b-modal>
    <div>
      <button @click="toastSuccess('Hola mundo')">toastSuccess</button>
      <button @click="toastError('Hola mundo')">toastError</button>
      <button @click="toastWarning('Hola mundo')">toastWarning</button>
      <button @click="toastInfo('Hola mundo')">toastInfo</button>
    </div>
  </div>
</template>
<script>
import flatpickConfig from '@/util/flatpickConfig'
import notificaciones from '@/util/notificaciones'

export default {
  name: 'test-component',
  mixins: [flatpickConfig, notificaciones],
  data () {
    return {
      modalAlta: false,
      buscando: false,
      fechaMin: null,
      fechaMax: null,
      opciones2: {dateFormat: 'd-m-Y', maxDate: null},
      opciones3: {dateFormat: 'd-m-Y', minDate: null}
    }
  },
  methods: {
    buscar () {
      this.buscando = true
    }
  },
  computed: {
    asd () {
      return ''
    }
  }
}
</script>

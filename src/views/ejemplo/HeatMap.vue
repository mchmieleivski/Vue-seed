<script>
import {MapElementMixin} from 'vue2-google-maps'

export default{
  name: 'Mapa-Calor',
  render () {
    return ''
  },
  mixins: [MapElementMixin],
  props: {
    data: {
      type: Array,
      required: true
    },
    radius: {
      type: Number,
      required: false,
      default: null
    },
    opacity: {
      type: Number,
      required: false,
      default: 0.6,
      validator (value) {
        return value >= 0 && value <= 1
      }
    },
    gradient: {
      type: Array,
      required: false,
      default: null
    },
    dissipating: {
      type: Boolean,
      required: false,
      default: true
    },
    maxIntensity: {
      type: Number,
      required: false,
      default: null
    },
    mostrar: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      coordenadas: []
    }
  },
  methods: {
    crearMapa (data) {
      this.coordenadas = []
      data.map(o => {
        /* eslint-disable */
        var d = new google.maps.LatLng(o.lat, o.lng)
        this.coordenadas.push(d)
      })
      /* eslint-disable */
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.coordenadas,
        map: this.$map,
        dissipating: this.dissipating,
        gradient: this.gradient,
        maxIntensity: this.maxIntensity,
        opacity: this.opacity,
        radius: this.radius
      })
    }
  },
  destroyed () {
    this.$heatmap.setMap(null)
  },
  deferredReady () {
    this.crearMapa(this.data)
  },
  watch: {
    data: {
      handler: function (newData) {
        this.$heatmap.setMap(null)
        this.crearMapa(newData)
      },
      deep: true
    },
    mostrar: {
      handler: function (newMostrar) {
        this.$heatmap.setMap(newMostrar ? this.$map : null)
      }
    },
    radius: {
      handler: function (newRadius) {
        this.$heatmap.set('radius', newRadius)
      }
    },
    opacity: {
      handler: function (newOpacity) {
        this.$heatmap.set('opacity', newOpacity)
      }
    },
    maxIntensity: {
      handler: function (newMaxIntensity) {
        this.$heatmap.set('maxIntensity', newMaxIntensity)
      }
    }
  }
}
</script>
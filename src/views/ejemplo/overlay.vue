<script>
import {MapElementMixin} from 'vue2-google-maps'

export default{
  name: 'overlay',
  render () {
    return ''
  },
  mixins: [MapElementMixin],
  props: ['source', 'bounds', 'opacity'],
  created () {},
  destroyed () {
    this.$overlay.setMap(null)
  },
  deferredReady () {
    /* eslint-disable */
    this.$overlay = new google.maps.GroundOverlay(
      this.source,
      this.bounds
    )
    this.$overlay.setOpacity(this.opacity)
    this.$overlay.setMap(this.$map)
  },
}
</script>
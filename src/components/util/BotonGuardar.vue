<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'save',
      type: String
    },
    label: {
      default: 'Guardar',
      type: String
    },
    newLabel: {
      default: 'Guardando',
      type: String
    },
    type: {
      default: 'success',
      type: String
    }
  }
}
</script>

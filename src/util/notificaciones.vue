<script>
  export default {
    methods: {
      toastSuccess (mensaje, titulo) {
        let title = titulo !== undefined ? titulo : 'Exito'
        this.$toastr('success', mensaje, title)
      },
      toastError (mensaje, titulo) {
        let title = titulo !== undefined ? titulo : 'Error'
        this.$toastr('error', mensaje, title)
      },
      toastWarning (mensaje, titulo) {
        let title = titulo !== undefined ? titulo : 'Atención'
        this.$toastr('warning', mensaje, title)
      },
      toastInfo (mensaje, titulo) {
        let title = titulo !== undefined ? titulo : 'Información'
        this.$toastr('info', mensaje, title)
      }
    }
  }
</script>

<template>
  <div>
    {{ errCode }}
  </div>
</template>

<script>
export default {
  name: 'Error',
  computed: {
    errCode: function () {
      return this.$route.params.errorcode
    }
  }
}
</script>

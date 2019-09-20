<template>
  <div>
    Something went wrong. Code {{ errCode }}
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

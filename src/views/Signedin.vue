<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ myHash }}
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    myHash: function () {
      var temp = this.convertHashToMap(this.$route.hash)
      // If undefined, goto Error
      return temp['access_token']
    }
  },
  methods: {
    convertHashToMap(value) {
      var map = []
      var entries = value.slice(1).split('&')
      entries.forEach(function(element) {
        var keyval = element.split('=')
        map[keyval[0]] = keyval[1]
      })
      return map
    }
  }
}
</script>

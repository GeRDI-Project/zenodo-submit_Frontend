<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <b-btn @click="click">Login to Zenodo</b-btn>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    click() {
      window.location.href = 'https://zenodo.org/oauth/authorize' +
      '?client_id=Z8x5dOr5qaMK41xPNfnHVF7NLxQmxtlJFVuOVtmD' +
      '&scope=deposit%3Awrite+deposit%3Aactions' +
      '&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsignedin&response_type=token'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

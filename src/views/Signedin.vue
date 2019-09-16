<template>
  <div>
    <Stepper :step="2"/>
    <h1>Only one more step</h1>
    You have been logged in into Zenodo. Just quickly check if the list below contains all files you want to submit. If so, click on Submit to start the process.
    <b-list-group class="mt-4">
      <b-list-group-item v-for="file in files">{{file}}</b-list-group-item>
    </b-list-group>
    <div class="mt-4">
      <!-- <b-btn class="float-left">Back</b-btn> -->
      <b-btn class="float-right">Submit</b-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Stepper from '@/components/Stepper.vue'

export default {
  name: 'signedin',
  components: {
    Stepper
  },
  data() {
    return {
      zenodoToken: null
    }
  },
  created() {
      var map = this.convertHashToMap(this.$route.hash)
      // If undefined, goto Error
      this.zenodoToken = map['access_token']
      if (this.$store.getters['zenodo/getState'] != map['state']) {
        console.error('State does not equal to generated value!')
        // Error
      }
  },
  computed: {
    files() {
      return this.$store.getters['zenodo/getFiles']
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

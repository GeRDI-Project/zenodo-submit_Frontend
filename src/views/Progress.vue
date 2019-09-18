<template>
  <div>
    <Stepper :step="3"/>
    <h2>Submitting...</h2>
    Your files are now being submitted to Zenodo. See their progress below.
    <b-list-group class="mt-4">
      <download-item v-for="data in progressData" :title="data.fileName" :progress="data.progressInPercent" :state="data.status" :key="data.fileName"/>
    </b-list-group>
    <div>
      {{$route.params.session}}
    </div>
    <b-btn @click="load">Lood</b-btn>
  </div>
</template>

<script>
import axios from 'axios'
import Stepper from '@/components/Stepper.vue'
import DownloadItem from '@/components/Downloaditem.vue'

const urlPrefix = '/api/v1/submit/zenodo/progress/'

export default {
  name: 'Overview',
  components: {
    DownloadItem,
    Stepper
  },
  data () {
    return {
      progressData: []
    }
  },
  methods: {
    load() {
      const self = this
      var id = this.$route.params.session
      var url = urlPrefix + id
      var token = this.$gerdi.aai.getIdToken()
      axios.get(url,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(function(response) {
        console.log(response.data.progressEntries)
        self.progressData = response.data.progressEntries
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

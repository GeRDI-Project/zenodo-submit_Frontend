<template>
  <div>
    <Stepper :step="3"/>
    <h2>Submitting...</h2>
    Your files are now being submitted to Zenodo. See their progress below.
    <b-list-group class="mt-4">
      <download-item v-for="data in progressData" :title="data.fileName" :progress="data.progress" :state="data.status" :key="data.fileName"/>
    </b-list-group>
    <div v-if="isFinished" class="mt-4 mb-4">
      Submit is finished. In order to finally publish the submission, go to <b-link :href="zenodoLink">Zenodo</b-link>.
    </div>
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
      progressData: [],
      unwatch: null,
      retries: 0
    }
  },
  created() {
    if (this.$gerdi.aai.isChecked() && this.$gerdi.aai.isAuthenticated()) {
      this.load()
    } else {
      this.unwatch = this.$watch(function() { return this.$gerdi.aai.isChecked() }, function () { this.init() })
    }
  },
  computed: {
    isFinished: function() {
      return this.progressData.filter(it => it.status != 'FINISHED' && it.status != 'ERROR').length == 0
    },
    zenodoLink: function() {
      return 'https://zenodo.org/deposit/' + this.$route.params.session
    }
  },
  methods: {
    init() {
      if (this.$gerdi.aai.isAuthenticated()) {
        this.load()
      } else {
        // TODO not logged in
      }
      this.unwatch()
    },
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
        self.retries = 0
        self.progressData = response.data.progressEntries
        if (!self.isFinished) window.setTimeout(self.load, 500)
      })
      .catch(function(response) {
        if (self.retries < 3) {
          self.retries++
          self.load()
        } else {
          self.$router.push({name: 'error', params: {errorcode: 304}})
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

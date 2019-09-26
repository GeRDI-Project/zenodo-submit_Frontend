<template>
  <div>
    <Stepper :step="3"/>
    <h1>Only one more step</h1>
    You have been logged in into Zenodo. Just quickly check if the info below contains everything you want to submit. If so, click on Submit to start the process.
    <h4 class="mt-4">Files to submit</h4>
    <b-list-group class="mt-4">
      <b-list-group-item v-for="file in files" :key="file">{{file}}</b-list-group-item>
    </b-list-group>
    <h4 class="mt-4">Metadata</h4>
    <b-row>
      <b-col md="auto">
        <div>
          Title:
        </div>
        <div>
          Description:
        </div>
        <div>
          Submission Type:
        </div>
        <div v-if="isAuthor">
          Author:
        </div>
        <div v-if="isFirstVersion != null">
          First Time Upload:
        </div>
      </b-col>
      <b-col>
        <div>
          {{ title }}
        </div>
        <div>
          {{ description }}
        </div>
        <div>
          {{ submissionType }}
        </div>
        <div v-if="isAuthor">
          {{ name }}
        </div>
        <div v-if="isFirstVersion != null">
          {{ isFirstVersion ? 'yes' : 'no' }}
        </div>
      </b-col>
    </b-row>
    <div class="mt-4">
      <!-- <b-btn class="float-left">Back</b-btn> -->
      <b-btn class="float-right" @click="startSubmit">Copy to Zenodo</b-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Stepper from '@/components/Stepper.vue'

const urlPrefix = '/api/v1/submit/zenodo/'

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
    },
    submissionType() {
      switch (this.$store.getters['zenodo/getSubmissionType']) {
        case 'dataset':
          return 'Dataset'
        case 'software':
          return 'Software'
        default:
          return 'Other'
      }
    },
    name() {
      return this.$store.getters['zenodo/getName']
    },
    title() {
      return this.$store.getters['zenodo/getTitle']
    },
    description() {
      return this.$store.getters['zenodo/getDescription']
    },
    isFirstVersion() {
      return this.$store.getters['zenodo/isFirstVersion']
    },
    isAuthor() {
        return this.$store.getters['zenodo/isAuthor']
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
    },
    startSubmit() {
      var token = this.$gerdi.aai.getIdToken()
      var headers = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      var payload = {
        metadata: {
          access_token: this.zenodoToken
        },
        files: this.files
      }
      payload.metadata['title'] = this.$store.getters['zenodo/getTitle']
      payload.metadata['description'] = this.$store.getters['zenodo/getDescription']

      var type = this.$store.getters['zenodo/getSubmissionType']
      if (type === 'none') type = 'other'
      payload.metadata['upload_type'] = type

      if (this.$store.getters['zenodo/isAuthor']) {
        payload.metadata['creators'] = []
        payload.metadata['creators'].push({ name: this.$store.getters['zenodo/getName'] })
      }

      if (this.$store.getters['zenodo/isFirstVersion']) {
        payload.metadata['version'] = '1.0'
        var d = new Date()
        payload.metadata['publication_date'] = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)
      }
      var self = this
      var url = urlPrefix + 'submit'
      axios.post(url, payload, headers)
        .then(function(response) {
          var zenodoId = response.data
          self.$store.commit('resetMetadata')
          self.$store.commit('updateFiles', null)
          self.$router.push({name: 'progress', params: {session: zenodoId}})
        })
    }
  }
}
</script>

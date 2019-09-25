<template>
  <div>
    <Stepper :step="0"/>
    <div class="text-center" v-if="!aaiChecked">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else-if="aaiChecked && !isAuthenticated">
      <b-alert show variant="warning">You are not logged in. Please <b-link @click="$gerdi.aai.signInUser()">log in</b-link> first.</b-alert>
    </div>
    <div v-else>
      <h2>Select Files</h2>
      Please select below all files you want to submit to Zenodo.
      <treeselect
        class="mt-4"
        :value="files"
        @input="updateFiles"
        :multiple="true" :options="options"
        :load-options="loadOptions"
        :auto-load-root-options="true"
        placeholder="Select or search your files..."
        value-consists-of="LEAF_PRIORITY"
        :disable-branch-nodes="true">
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName }" :class="labelClassName">
            <font-awesome-icon  icon="folder" class="list-icon" v-if="node.isBranch" /> {{ node.label }}
        </label>
      </treeselect>
      <div class="mt-4">
        <!-- <b-btn class="float-left">Back</b-btn> -->
        <b-btn class="float-right" :to="'metadata'" :disabled="files === null || files.length == 0">Next</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Stepper from '@/components/Stepper.vue'
import Treeselect from '@riophae/vue-treeselect'
import { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'

library.add(faFolder)

const urlPrefix = '/api/v1/submit/zenodo/'

export default {
  name: 'filebrowser',
  components: {
    Stepper,
    Treeselect,
    FontAwesomeIcon
  },
  data() {
    return {
      options: null,
      loaded: false
    }
  },
  created() {
  },
  computed: {
    files() {
      return this.$store.getters['zenodo/getFiles']
    },
    aaiChecked() {
      return this.$gerdi.aai.isChecked()
    },
    isAuthenticated() {
      return this.$gerdi.aai.isAuthenticated()
    }
  },
  methods: {
    updateFiles(val) {
      this.$store.commit('zenodo/updateFiles', val)
    },
    loadOptions({ action, parentNode, callback }) {
      var self = this
      if (action === LOAD_ROOT_OPTIONS) {
        this.sendRequest({
          pathSuffix: '/',
          callback: function(val) {
            self.options = val
            callback()
          },
          callbackError: function(val){
            callback(val)
          }
        })
      } else {
        this.sendRequest({
          pathSuffix: parentNode.id,
          callback: function(val) {
            parentNode.children = val
            callback()
          },
          callbackError: function(val){
            callback(val)
          }
        })
      }
    },
    sendRequest({pathSuffix = '/', callback, callbackError}){
      var url = urlPrefix + "files?path=" + pathSuffix
      var token = this.$gerdi.aai.getIdToken()
      axios.get(url,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(function(response) {
        var elements = response.data.elements
        var values = elements.map(elem => {
          var id = pathSuffix.endsWith('/') ? pathSuffix : pathSuffix + '/'
          id += elem.displayName
          var value = {
            id: id,
            label: elem.displayName
          }
          if(elem.type === 'Directory') {
            value['children'] = null
          }
          return value
        })
        callback(values)
      })
      .catch(function(error) {
        if (error.response.status === 403) {
          callbackError(new Error('You are not logged in.'))
        } else {
          callbackError(new Error("Something unexpected happened."))
        }
      });
    }
  }
}
</script>

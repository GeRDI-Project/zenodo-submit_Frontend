<template>
  <div>
    <div class="text-center d-flex align-items-center justify-content-center">
      <font-awesome-icon class="warning-circle-content float-left mr-5" icon="exclamation"/>
      <h2>Oh Snap! This shouldn't have happened.</h2>
    </div>
    <err-msg v-if="errCode == 40" class="p-4">
      Zenodo's response was somehow modified. Due to security concerns, the submit process is aborted.
    </err-msg>
    <err-msg v-else-if="errCode == 41" class="p-4">
      You couldn't be logged in to Zenodo.
    </err-msg>
    <err-msg v-else-if="errCode == 34" class="p-4">
      We could not connect to the GeRDI server. Please check on <b-link href="https://zenodo.org">Zenodo</b-link> if the submission worked.
    </err-msg>
    <err-msg v-else class="p-4"></err-msg>
  </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamation)

export default {
  name: 'Error',
  components: {
    'err-msg': ErrorMessage,
    FontAwesomeIcon
  },
  computed: {
    errCode: function () {
      return this.$route.params.errorcode
    }
  }
}
</script>

<style scoped>
.warning-circle-content {
  color: rgba(100, 0, 0, 0.25);
  background: #f8d7da;
  width: 80px;
  height: 80px;
  border-width: 3px;
  border-style: solid;
  border-color: rgba(100, 0, 0, 0.25);
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  padding: 20px;
}
</style>

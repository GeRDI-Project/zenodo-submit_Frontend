<template>
  <div>
    <Stepper v-bind:step="1"/>
    <h2>Prefill Metadata</h2>
    Some metadata can already be prefilled for you by us. Please check the following suggestions. Additional metadata can be added later on.
    <div class="mt-4">
      <b-form-group label="Did you author at least parts of the data contained in this submission?">
        <b-form-radio-group v-model="isAuthor">
          <b-form-radio :value="true">Yes or in collaboration with others</b-form-radio>
          <b-form-radio :value="false">No, I'm submitting on behalf of a third person</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group v-if="isAuthor" class="ml-5 mb-4" label="Please check your name for correct spelling:">
        <b-form-input
              id="input-live"
              v-model="name"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your name"
              trim
            ></b-form-input>
      </b-form-group>
      <b-form-group label="Does this submission mainly contain datasets or software?">
        <b-form-radio-group
          id="radio-group-1"
          v-model="submissionType"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="Is this the first time you upload this data? If so, we can prefill the publication date and version number for you.">
        <b-form-radio-group v-model="isFirstVersion">
          <b-form-radio :value="true">Yes, please</b-form-radio>
          <b-form-radio :value="false">No, thanks</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div>
      <b-btn :to="'browser'" class="float-left">Back</b-btn><b-btn @click="goToLogin" class="float-right">Next</b-btn><b-btn variant="skip" class="float-right">Skip</b-btn>
    </div>
  </div>
</template>

<script>
import Stepper from '@/components/Stepper.vue'

export default {
  name: 'Metadata',
  components: {
    Stepper
  },
  data() {
    return {
      options: [
        { text: 'Yes, mainly datasets', value: 'dataset' },
        { text: 'Yes, mainly software', value: 'software' },
        { text: 'No, something different', value: 'none' }
      ]
    }
  },
  created() {
    if (this.name === null) {
      this.name = this.$gerdi.aai.getUser().family_name + ', ' + this.$gerdi.aai.getUser().given_name
    }
  },
  computed: {
    isAuthor: {
      get() {
        return this.$store.getters['zenodo/isAuthor']
      },
      set(value) {
        this.$store.commit('zenodo/updateIsAuthor', value)
      }
    },
    isFirstVersion: {
      get() {
        return this.$store.getters['zenodo/isFirstVersion']
      },
      set(value) {
        this.$store.commit('zenodo/updateIsFirstVersion', value)
      }
    },
    submissionType: {
      get() {
        return this.$store.getters['zenodo/getSubmissionType']
      },
      set(value) {
        this.$store.commit('zenodo/updateSubmissionType', value)
      }
    },
    name: {
      get() {
        return this.$store.getters['zenodo/getName']
      },
      set(value) {
        this.$store.commit('zenodo/updateName', value)
      }
    }
  },
  methods: {
    goToLogin() {
      var url = ''
      if (process.env.NODE_ENV === 'development') {
        url = 'http://localhost:8080'
      } else {
        url = 'https://www.test.gerdi.org'
      }
      url = encodeURIComponent(url)
      var state = Math.random().toString(36).substring(2,7);
      this.$store.commit('zenodo/updateState', state)
      window.location.href = 'https://zenodo.org/oauth/authorize?scope=deposit%3Awrite&state=' + state + '&redirect_uri=' + url + '%2Fsubmit%2Fzenodo%2Fsignedin&response_type=token&client_id=Z8x5dOr5qaMK41xPNfnHVF7NLxQmxtlJFVuOVtmD'
    }
  }
}
</script>

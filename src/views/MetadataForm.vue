<template>
  <div>
    <Stepper v-bind:step="1"/>
    <h2>Fill Out Metadata</h2>
    In the following you need to first fill out the metadata required by Zenodo. In Addition to that, we are able to assist you on some additional metadata. Everything you fill out can be changed on the Zenodo webpage later on.
    <div class="mt-4">
      <h4>Required Metadata</h4>
        <b-form-group label="What title will this submission have?">
          <b-form-input
                id="input-live"
                v-model="title"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Enter a title"
                trim
                :state="states.title"
                required
              ></b-form-input>
        </b-form-group>
        <b-form-group label="Does this submission mainly contain datasets or software?">
          <b-form-radio-group
            id="radio-group-1"
            v-model="submissionType"
            :options="options"
            :state="states.type"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group label="Please fill in a short description:">
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Enter a description..."
            rows="3"
            :state="states.description"
            no-resize
          ></b-form-textarea>
        </b-form-group>
    </div>
    <div class="mt-4">
      <h4>Additional Metadata</h4>
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
      <b-form-group label="Is this the first time you upload this data? If so, we can prefill the publication date and version number for you.">
        <b-form-radio-group v-model="isFirstVersion">
          <b-form-radio :value="true">Yes, please</b-form-radio>
          <b-form-radio :value="false">No, thanks</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div class="mb-3">
      <b-btn :to="'browser'" class="float-left">Back</b-btn><b-btn @click="goToLogin" class="float-right mb-4"  :disable="(description != null && description.length > 0) || (title != null && title.length > 0) || submissionType == null">Next</b-btn>
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
      ],
      states: {
        title: null,
        type: null,
        description: null
      }
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
    },
    title: {
      get() {
        return this.$store.getters['zenodo/getTitle']
      },
      set(value) {
        this.$store.commit('zenodo/updateTitle', value)
      }
    },
    description: {
      get() {
        return this.$store.getters['zenodo/getDescription']
      },
      set(value) {
        this.$store.commit('zenodo/updateDescription', value)
      }
    }
  },
  methods: {
    goToLogin() {
      if (this.description === null || this.description.length == 0) {
        this.states.description = false
      } else {
        this.states.description = null
      }

      if (this.title === null || this.title.length == 0) {
        this.states.title = false
      } else {
        this.states.title = null
      }

      if (this.submissionType === null) {
        this.states.type = false
      } else {
        this.states.type = null
      }

      if (this.states.title == false || this.states.type == false || this.states.description == false) return

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

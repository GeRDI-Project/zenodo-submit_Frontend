/**
 * Copyright 2019 Nelson Tavares de Sousa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const state = {
  isAuthor: null,
  isFirstVersion: null,
  submissionType: null,
  files: null,
  name: null,
  state: null
}

const getters = {
  getFiles (state) {
    return state.files
  },
  isAuthor (state) {
    return state.isAuthor
  },
  isFirstVersion (state) {
    return state.isFirstVersion
  },
  getSubmissionType (state) {
    return state.submissionType
  },
  getName (state) {
    return state.name
  },
  getState (state) {
    return state.state
  }
}

const mutations = {
  initialize (state) {
    state.test = true
  },
  updateFiles(state, value) {
    state.files = value
  },
  updateIsAuthor(state, value) {
    state.isAuthor = value
  },
  updateIsFirstVersion(state, value) {
    state.isFirstVersion = value
  },
  updateSubmissionType(state, value) {
    state.submissionType = value
  },
  updateName(state, value) {
    state.name = value
  },
  updateState(state, value) {
    state.state = value
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

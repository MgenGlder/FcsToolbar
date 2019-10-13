
import Vue from 'vue'

Vue.use(require('vue-electron'))

const mockVue = new Vue()
const state = {
  name: '',
  folderLocations: {
    fcs: '',
    fcsWeb: '',
    fcsUi: ''
  }
}
const mutations = {
  SET_FOLDER_LOCATIONS (state, payload) {
    if (payload === undefined) {
      return
    }
    // Store runs on the back end, so we have to use the IPCMain to to interact directly with the backend;
    // Also, because the same store code runs on the back end main process as well as the renderer, we have to use flags 
    // to guarantee that this code is only run on the backend store
    mockVue.$electron.ipcMain._events.updateFolderConfigurations({}, state.folderLocations)
    state.folderLocations.fcs = payload.fcs
    state.folderLocations.fcsWeb = payload.fcsWeb
    state.folderLocations.fcsUi = payload.fcsUi
  }
}

const actions = {
  setFolderLocations ({ commit }, payload) {
    commit('SET_FOLDER_LOCATIONS', payload)
  }
}

const getters = {
  getFolderLocations (state) {
    return state.folderLocations
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

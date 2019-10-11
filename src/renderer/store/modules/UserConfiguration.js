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
    console.log('setting the state to become something else', payload)
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

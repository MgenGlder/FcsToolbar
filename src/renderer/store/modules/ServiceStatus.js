const state = {
  sevices: {
    '8088': 'stopped',
    '8089': 'stopped',
    '8090': 'stopped',
    '8091': 'stopped',
    '8092': 'stopped'
  },
  externals: {
    '8080': 'stopped',
    '8081': 'stopped',
    '8082': 'stopped',
    '8083': 'stopped',
    '8084': 'stopped',
    '8085': 'stopped',
    '8086': 'stopped'
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  UPDATE_SERVICES_STATUS (state, servicesStatus) {
    state.services = servicesStatus
  },
  UPDATE_EXTERNALS_STATUS (state, externalsStatus) {
    state.externals = externalsStatus
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  updateServicesStatus ({ commit }, servicesStatus) {
    commit('UPDATE_SERVICES_STATUS', servicesStatus)
  },
  updateExternalsStatus ({ commit }, externalsStatus) {
    commit('UPDATE_EXTERNALS_STATUS', externalsStatus)
  }

}

export default {
  state,
  mutations,
  actions
}

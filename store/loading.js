const state = {
  loading: null
};

const actions = {
  setLoader({
    commit
  }) {
    commit('loaderSet')
  },
  UnsetLoader({
    commit
  }) {
    commit('loaderUnset')
  }
};


const mutations = {
  loaderSet(state) {
    state.loading = true
  },
  loaderUnset(state) {
    state.loading = false
  }
};

const getters = {
  getloader(state) {
    return state.loader
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}

const state = {
  total: 0,
  data: []
};

const getters = {
  CurrentArticles(state) {
    return {
      'total': state.total,
      'results': state.data
    }
  }
};
const actions = {
  async getArticles({
    commit
  }, payload) {
    const res = await this.$axios
      .$get(`article/getall?page=${payload.page}`)

    commit('setArticles', res)

  },
};

const mutations = {
  setArticles(state, res) {
    state.total = res.count,
      state.data = res.results
  }
};

export default {
  actions,
  state,
  mutations,
  getters,
}

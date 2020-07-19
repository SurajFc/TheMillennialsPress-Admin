import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
    state:{
        users:0,
        articles:0,
    },
    mutations: {
        setItems(state, items) {
        console.log("====>",items)
        state.users = items['users']
        state.articles = items['articles']
        }
    },
    actions: {
        async FetchItems(vuexContext) {
            const response = await this.$axios.$get('totalOverview');
            console.log("inactions===>",response);

            vuexContext.commit('setItems', response);
        },
    },
    getters:{
        getAll(state){
            return {
                'users':state.users,
                'articles':state.articles
            }
        }
    }
})
}
export default createStore

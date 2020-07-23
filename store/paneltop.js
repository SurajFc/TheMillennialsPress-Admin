
const state= {
        users:0,
        articles:0,
    };
const  mutations= {
        setItems(state, items) {
        console.log("====>",items)
        state.users = items['users']
        state.articles = items['articles']
        }
    };
 const actions= {
        async FetchItems({commit}) {
            const response = await this.$axios.$get('totalOverview');
            console.log("inactions===>",response);

            commit('setItems', response);
        },
    };
const  getters={
        getAll(state){
            return {
                'users':state.users,
                'articles':state.articles
            }
        }
    };

    export default{
        state,
        getters,
        mutations,
        actions
    }
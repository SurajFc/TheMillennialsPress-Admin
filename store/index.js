import Vuex from 'vuex';
import Panel from '~/store/paneltop.js';
import Toast from '~/store/toaster.js';
import Article from '~/store/article.js';
import Loading from '~/store/loading.js';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Panel,
      Toast,
      Article,
      Loading

    }
  })
}
export default createStore

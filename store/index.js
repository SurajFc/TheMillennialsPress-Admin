import Vuex from 'vuex';
import Panel from '~/store/paneltop.js';
import Toast from '~/store/toaster.js';

const createStore = () => {
    return new Vuex.Store({
   modules:{
      Panel,
      Toast
   }
})
}
export default createStore

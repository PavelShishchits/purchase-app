import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'default'
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})

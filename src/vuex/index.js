import {createStore} from 'vuex';
import router from "../router";

const state = {
  userInfo: {},
  login: false,
  token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ""
};

const mutations = {
  changeLogin (state,token) {
    state.token = token;
    localStorage.setItem('Authorization',token);
  },
  removeToken(state){
    state.token = "";
    localStorage.removeItem('Authorization');
    router.replace('/')
  }
};

const store = createStore({
  state,
  mutations
})

export default store
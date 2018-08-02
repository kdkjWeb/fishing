import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    token: '',
    baseUrl: 'http://192.168.20.158:8080/'
};
export default new Vuex.Store({
    state: state,
    getters:{
        getToken: state=>state.token
    },
    mutations:{
        setToken(state,data){
            sessionStorage.token = data;
            state.token = data;
        }
    }
})
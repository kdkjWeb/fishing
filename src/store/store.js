import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    token: '',

    baseUrl: 'http://192.168.20.158:8080/',
    //  baseUrl: 'http://www.scdiaoyu.cn/fish/',
    // imagesUrl:'http://www.scdiaoyu.cn/fish/common/uploadOssPic',
    imagesUrl:'http://192.168.20.158:8080/common/uploadOssPic',



};
export default new Vuex.Store({
    state: state,
    getters:{
        getToken: state=>state.token,
        getimagesUrl:state=>state.imagesUrl
    },
    mutations:{
        setToken(state,data){
            sessionStorage.token = data;
            state.token = data;
        }
    }
})

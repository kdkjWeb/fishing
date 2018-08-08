import Vue from 'vue'
import Axios from 'axios'
import store from './../store/store'
import { Message, Loading } from 'element-ui';


Axios.defaults.baseURL = 'http://192.168.20.3:8080/';
Axios.defaults.timeout = 50000;

Axios.defaults.withCredentials = true;


// http request 拦截器
Axios.interceptors.request.use(

    config =>{
        if(store.state.token){   //判断是否存在token,如果存在，则在每个header都加上token
            //   config.headers.Authorization = `token ${store.state.token}`;
           config.headers['token'] = store.state.token;   //请求头设置token
        }
        return config;
    },
    err =>{
        return Promise.reject(err);
    }
);



// http response 拦截器
/*Axios.interceptors.response.use(
    response =>{
        console.log(response)
        return response;
    },
    err =>{
        if(err.response){
            console.log(err)
        }
    }
)*/



/*axiosConfig.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });*/





/***
 * 公用的server方法
 */

export default{
    //get请求
    get:(url,data,load)=>{
      let loading;
      if(load || load == undefined) {
          loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }
      return new Promise((resolve,reject)=>{
          Axios.get(url,{
              params: data
          }).then((res)=>{
                 //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }

              if(res.data.code == 0){
                  resolve(res.data)
              }else if(res.data.code == 500){
                  resolve(res.data)
              }
          },err=>{
                 //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }
             
              if(err.msg){
                  Message({
                      message: err.msg,
                      type: 'warning'
                    });
              }else{
                  Message({
                      message: '系统异常',
                      type: 'warning'
                    });
              }

          }).catch((err)=>{
          
                 //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }

              reject(err)
          })
      })
  },


    //post请求
    post: (url,data,load)=>{
      let loading;
      if(load || load == undefined) {
          loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }

      return new Promise((resolve,reject)=>{
          Axios.post(url,data)
          .then((res)=>{

                //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }
              if(res.data.code == 0){
                  resolve(res.data)
              }else if(res.data.code == 500){
                  resolve(res.data);
              }
          },err=>{
                //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }
              
              if(err.msg){
                  Message({
                      message: err.msg,
                      type: 'warning'
                    });
              }else{
                  Message({
                      message: '系统异常',
                      type: 'warning'
                    });
              }

          }).catch((err)=>{
            
                 //如果动画为true，返回之后需要关闭动画
              if(load || load == undefined) {
                  loading.close();
              }
              reject(err)
          })
      })
  }
}

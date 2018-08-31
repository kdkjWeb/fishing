import Vue from 'vue'
import Axios from 'axios'
import store from './../store/store'
import { Message, Loading } from 'element-ui';




Axios.defaults.baseURL = 'http://192.168.20.158:8080/';
// Axios.defaults.baseURL = 'http://www.scdiaoyu.cn/fish/';
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
Axios.interceptors.response.use(
    response =>{
        //如果返回602  需要重新登录
        if(response.code == 602){
            this.$message.error(response.msg);
            setTimeout(()=>{
                this.$router.push({
                    name: 'login'
                })
            },1500)
            }
        return response;
    },
    err =>{
        console.log(err)
        if(err.response){

        }
    }
)



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
  },



  //导出
  /*exported: (url,obj,time1 = 'cdate',time2 = 'enddate',date = 'date')=>{
    let path = 'http://192.168.20.3:8080/';
    let href = path + url;
    let json = {};

//因为时间是装在一个数组中的，需要重新组装成json
 Object.keys(obj).forEach((key,index)=>{
        if(obj[key] != '' && key != date){
            json[key] = obj[key]
        }else if(obj.date.length > 0 && key == date){
            json.time1 =  `${dataTransform(obj.date[0])} 00:00:00`;
            json.time2 =  `${dataTransform(obj.date[1])} 23:59:59`;
        }
    })


//判断用户是否输入查询条件导出，如果没有就导出全部，反之则遍历拼接成新的字符串作为导出地址
    if(Object.keys(json).length == 0){
         href = href + '?' + 'pageSizes' + '=' +0 + '&pageNum' + '=' +1
    }else{
        href = href + '?';
        Object.keys(json).forEach((key,index) => {
        if(json[key] != ''){
            href = href+'&'+key+'='+json[key];
        }
    });
    }

   location.href = href;
  },*/




}

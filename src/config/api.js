import axios from 'axios'

// 弹窗信息
import {ElMessage} from "element-plus"

import store from "../vuex";
// import router from "../router";
/**
 *  响应拦截  后端响应拦截  处理信息
 */
axios.interceptors.response.use(success => {
  // 业务逻辑错误    401=>未登录
  // success 表示成功请求到后端接口
  console.log(success)
  if (success.data.code == 500 || success.data.code == 401 || success.data.code == 500){
    ElMessage.error({
      message:success.data.message
    });
    return;
  }
  // 其他判断为成功
  if(success.data.result == "SUCCESS"){
    if(localStorage.getItem('Authorization') == "undefined" || localStorage.getItem('Authorization') == null){
      store.commit("changeLogin",success.data.data.token)
    }else{
      console.log("已登录成功，没有token传过来！");
    }
    // ElMessage.success({
    //   message:success.data
    // })
  }

    if(success.data.result == "FAILED"){
      ElMessage.error({
        message:success.data.message
      })
    }

  return success.data;
},error => {
  // error表示没有请求到后端接口
  //   store.commit("removeToken")
  if (error.response.code==504||error.response.code==404){
    ElMessage.error({
      message:'服务器被吃了╮(╯▽╰)╭'
    })
  }else if(error.response.code==403){
    ElMessage.error({
      message:'权限不足，请联系管理员╮(╯▽╰)╭'
    })
  }else if(error.response.code==401){
    ElMessage.error({
      message:'您还为登录╮(╯▽╰)╭'
    })
    console.log("返回登录界面");
    // router.push("/")
  }else{
    if(error.response.data.message){
      ElMessage.error({
        message:error.response.data.message
      })
    }else{
      ElMessage.error({
        message:"未知错误"
      })
    }
  }
  return;
}
);


// 请求

axios.interceptors.request.use(
  config => {
    console.log("axios.interceptors.request");
    if (localStorage.Authorization) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log("axios.interceptors.request");
      config.headers.Authorization = `${localStorage.Authorization}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });



let base = '';

let headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

let transformRequest = [
  function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'))
    return ret
  }]
// get请求
  export const getRequest = (url,params)=>{
  return axios({
    method: 'get',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    params:params
  })
}


// json格式的post请求
export const postRequest = (url,params)=>{
  return axios({
    method: 'post',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    data: params
  })
}

// from-data格式的post请求
export const postRequestFromData = (url,params)=>{
  return axios({
    method: 'post',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    data: params,
    headers: headers,
    transformRequest: transformRequest
  })
}

// from-data格式的post请求
export const postRequestFromDataWithFun = (url,params,funcA,funcB)=>{
  return axios({
    method: 'post',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    data: params,
    headers: headers,
    transformRequest: transformRequest
  }).then(funcA).catch(funcB())
}

// delete请求
export const deleteRequest = (url,params)=>{
  return axios({
    method: 'delete',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    params: params,
  })
}

// put请求
export const putRequest = (url,params)=>{
  return axios({
    method: 'put',
    // 注意格式
    url: `${base}${url}`,
    // 传送的数据
    data: params,
  })
}
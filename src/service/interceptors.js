import React from 'react';
import Axios from 'axios'
import { HashRouter } from 'react-router-dom'
import Loading from '../common/Loading/Index'
//取消请求
// let CancelToken = axios.CancelToken
// axios.create({
//     timeout: 15000 ,// 请求超时时间
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
// })
//开始请求设置，发起拦截处理
// axios.interceptors.request.use(config => {
//   //得到参数中的requestname字段，用于决定下次发起请求，取消相应的  相同字段的请求
//   //post和get请求方式的不同，使用三木运算处理
//   let requestName = config.method === 'post'?config.data.requestName :config.params.requestName
//   //判断，如果这里拿到上一次的requestName，就取消上一次的请求
//   if(requestName) {
//       if(axios[requestName]&&axios[requestName].cancel){
//           axios[requestName].cancel()
//       }
//       config.cancelToken = new CancelToken(c => {
//           axios[requestName] = {}
//           axios[requestName].cancel = c
//       })
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
//   })

Axios.interceptors.request.use(function (config) {
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

//respone拦截器
Axios.interceptors.response.use((config) => {
  //   config.setHeaders([
  //     ...
  //     // 在这里设置请求头与携带token信息
  // ])
  return config
}, (error) => {
  // 如何在这里加入react中的路由转跳？
  const router = new HashRouter()
  //router.history.push('/')
  return Promise.reject(error);
});

export default Axios
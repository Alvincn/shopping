import axios from 'axios';
import nProgress from 'nprogress';
import store from '@/store';

// 引入进度条样式
import 'nprogress/nprogress.css';
// 1.利用axios对象的方法，创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径之中会自动拼上api
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000,
});
// 请求拦截器，只要发请求，就可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，对象里边有一个属性很重要，就是header请求头
  // 进度条开始
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token || window.localStorage.getItem('token')) {
    config.headers.token = store.state.user.token || window.localStorage.getItem('token');
  }
  nProgress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 当响应成功时的回调
    // 进度条结束
    nProgress.done();
    return res.data;
  },
  // 当响应失败的回调
  (error) => {
    return Promise.reject(new Error('fail'));
  }
);

export default requests;

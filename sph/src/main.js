import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from '@/router';
// Vue生产提示
Vue.config.productionTip = false;
// 注册全局组件
import TypeNav from '@/components/TypeNav';
// 引入vuex
import store from '@/store';
// 引入mockServe
import '@/mock/mockServe.js';
// 注册全局组件
// 三个参数：1. 全局组件的名字 2. 哪一个组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');

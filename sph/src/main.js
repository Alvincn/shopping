import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from '@/router';
// Vue生产提示
Vue.config.productionTip = false;

// 引入vuex
import store from '@/store';
// 引入mockServe
import '@/mock/mockServe.js';
// 引入swiper
import 'swiper/css/swiper.css';
// 统一引入接口函数
import * as API from '@/api';
// 按照需求引入elementui
import { Button, MessageBox } from 'element-ui';

// 注册全局组件 再入口文件注册一次之后，全局都可使用
// 引入轮播图
import TypeNav from '@/components/TypeNav';
import Carsousel from '@/components/Carsousel';
import Pagination from '@/components/Pagination';
// 注册全局组件
// 三个参数：1. 全局组件的名字 2. 哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
// 全局注册Elementui
Vue.component(Button.name, Button);
// 注册组件还有一种写法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  router,
  store,
}).$mount('#app');

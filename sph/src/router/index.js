import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 对路由的push方法进行重写
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      meta: {
        show: true,
      },
    },
    {
      path: '/search',
      component: Search,
      meta: {
        show: true,
      },
      name: 'search',
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false,
      },
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false,
      },
    },
  ],
});

import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入全部路由
import routes from './routes';
// 引入store
import store from '@/store';
Vue.use(VueRouter);
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
// 对外保留VueRouter的实例
let router = new VueRouter({
  routes,
  scrollBehavior(from, to, savedPosition) {
    return { y: 0 };
  },
});
// 全局守卫。前置守卫
router.beforeEach((to, from, next) => {
  let token = store.state.user.token;
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      return next('/home');
    }
    next();
  } else {
    next();
  }
});
export default router;

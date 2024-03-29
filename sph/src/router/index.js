import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入全部路由
import routes from './routes';
// 引入store
import store from '@/store';
import { Button, MessageBox } from 'element-ui';
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
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let userName = store.state.user.userInfo.name;
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home');
    } else {
      // 如果说没有用户信息的话
      if (!userName) {
        // 获取用户信息
        try {
          // 获取用户信息
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // 如果说token失效了，需要重新获取
          store.dispatch('userLogout');
          next('/login');
        }
      } else {
        next();
      }
    }
  } else {
    if (
      to.path == '/trade' ||
      to.path == '/center/myorder' ||
      to.path == '/shopcart' ||
      to.path == '/pay'
    ) {
      MessageBox.alert('未登录，请先登录').then(() => next('/login?redirect=' + to.path));
    }
    next();
  }
});
export default router;

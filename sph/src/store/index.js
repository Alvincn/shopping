import Vue from 'vue';
import vuex from 'vuex';
// 使用插件
Vue.use(vuex);
// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import trade from './trade';

export default new vuex.Store({
  // 实现vuex仓库模块式开发储存数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});

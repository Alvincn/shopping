import { reqGetCode, reqUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from '@/api';

// 登录注册模块的仓库
const state = {
  code: '',
  token: window.localStorage.getItem('token') || '',
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEARUSERINFO(state) {
    state.userInfo = {};
    state.token = '';
    localStorage.removeItem('token');
  },
};
const actions = {
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.code == 200) {
      Promise.resolve('ok');
      commit('GETCODE', result.data);
    } else {
      return Promise.reject('Error');
    }
  },
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token);
      window.localStorage.setItem('token', result.data.token);
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log(result);
    if (result.code == 200) {
      commit('GETUSERINFO', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  async userLogout({ commit }) {
    let result = await reqUserLogout();
    if (result.code == 200) {
      commit('CLEARUSERINFO');
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
};
const getters = {};
// 文件模块

export default {
  state,
  mutations,
  actions,
  getters,
};

import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';

const state = {
  cartList: {},
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    console.log(result);
    if (result.code == 200) {
      commit('GETCARTLIST', result.data);
    }
  },
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('false'));
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((cart) => {
      let promise = cart.isChecked == 1 ? dispatch('deleteCartListBySkuId', cart.skuId) : '';
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
  cartInfoList(state) {
    return state.cartList[0].cartInfoList || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};

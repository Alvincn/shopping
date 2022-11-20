import { reqCartList, reqDeleteCartById } from '@/api';

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

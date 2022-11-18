import { reqCartList } from '@/api';

const state = {};
const mutations = {};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    console.log(result);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};

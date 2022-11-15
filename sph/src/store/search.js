import { reqGetSearchInfo } from '@/api';
// search 模块的仓库
const state = {
  searchList: {},
};
const mutations = {
  SEARCHINFO(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit('SEARCHINFO', result.data);
    }
  },
};
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};

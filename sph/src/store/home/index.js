import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api/index.js';

// Home 模块的仓库
const state = {
  // 初始值根据获得的数据设置类型
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    let result = categoryList.pop();
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('BANNERLIST', result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('FLOORLIST', result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};

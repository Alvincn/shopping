import { reqCategoryList } from '@/api/index.js';

// Home 模块的仓库
const state = {};
const mutations = {};
const actions = {
  async categoryList() {
    let result = await reqCategoryList();
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

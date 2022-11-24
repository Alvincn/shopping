// 进行api的统一管理
import requests from './request';
import mockRequests from './mockAjax';

// 三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// axios法请求返回结果是Promise对象

export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqGetBannerList = () => mockRequests.get('/banner');
// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');
// 获取搜索模块数据
export const reqGetSearchInfo = (params) =>
  requests({ url: '/list', method: 'post', data: params || {} });
// 获取产品详情信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
// 将商品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  let url = '/cart/addToCart/' + skuId + '/' + skuNum;
  return requests({ url, method: 'post' });
};
// 获取购物车列表
export const reqCartList = (skuId) => requests({ url: `/cart/cartList`, method: 'get' });
// 删除购物车数据
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// 修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

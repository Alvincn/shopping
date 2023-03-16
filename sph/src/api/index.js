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
// 获取验证码
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
// 注册
export const reqUserRegister = (data) =>
  requests({ url: `/user/passport/register`, data, method: 'post' });
// 登录
export const reqUserLogin = (data) =>
  requests({ url: `/user/passport/login`, data, method: 'post' });
// 获取用户信息，需要待着用户的token
export const reqUserInfo = () =>
  requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });

// 退出登录
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

// 获取用户信息
export const reqAddressInfo = () =>
  requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

// 获取商品清单
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
};

// 13. 获取订单支付信息
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

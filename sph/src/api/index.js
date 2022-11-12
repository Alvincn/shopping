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

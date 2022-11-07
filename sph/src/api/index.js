// 进行api的统一管理
import requests from './request';

// 三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// axios法请求返回结果是Promise对象

export const reqCategoryList = () =>
  requests({ url: '/api/product/getBaseCategoryList', method: 'get' });

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';
export default [
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/pages/Center'),
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder'),
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
    meta: {
      show: true,
    },
  },
  {
    path: '/paysuccess/',
    name: 'PaySuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: {
      show: true,
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/Pay'),
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/pages/Trade'),
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      // 只能从购物车界面跳转到交易页面
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: {
      show: true,
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: {
      show: true,
    },
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: {
      show: true,
    },
    name: 'search',
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: {
      show: false,
    },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: {
      show: false,
    },
  },
  {
    path: '/detail/:skuid',
    component: () => import('@/pages/Detail'),
    meta: {
      show: false,
    },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: {
      show: true,
    },
  },
];

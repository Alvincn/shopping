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
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: groupOrder,
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
    component: PaySuccess,
    meta: {
      show: true,
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
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
    component: Trade,
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
    component: AddCartSuccess,
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
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: {
      show: true,
    },
    name: 'search',
  },
  {
    path: '/login',
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      show: false,
    },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      show: false,
    },
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {
      show: true,
    },
  },
];

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
export default [
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: {
      show: true,
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: {
      show: true,
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

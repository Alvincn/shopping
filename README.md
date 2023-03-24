# Day01

## 创建项目

使用`vue create sph`新建项目，选择 vue2

生成项目，项目结构如下：

> node_modules:放置项目依赖的地方
> public:一般放置一些共用的静态资源，打包上线的时候，public 文件夹里面资源原封不动打包到 dist 文件夹里面
> src：程序员源代码文件夹
> -----assets 文件夹：经常放置一些静态资源（图片），assets 文件夹里面资源 webpack 会进行打包为一个模块（js 文件夹里面）
> -----components 文件夹:一般放置非路由组件（或者项目共用的组件）
> App.vue 唯一的根组件
> main.js 入口文件【程序最先执行的文件】
> babel.config.js:babel 配置文件
> package.json：看到项目描述、项目依赖、项目运行指令
> README.md:项目说明文件

## 创建 GitHub 仓库

首先创建了一个 Shopping 仓库，

使用`git clone url`克隆仓库

将 sph 文件夹拖入到 shopping 文件夹中，

> > 遇到问题：
>
> 这时我在 shopping 文件夹中使用 git commit 以及 git push 提示我在本文件夹下还有子模块
>
> 提交之后在 GitHub 上为一个箭头样式的文件夹且无法打开
>
> > 查找原因
>
> 原来是因为这个文件夹里面有.git 隐藏文件，github 就将他视为一个子系统模块了。
>
> > 解决办法：
>
> 1、删除文件夹里面的.git 文件夹
>
> 2、执行 git rm --cached [文件夹名]
>
> 3、执行 git add [文件夹名]
>
> 4、执行 git [commit](https://so.csdn.net/so/search?q=commit&spm=1001.2101.3001.7020) -m "msg"
>
> 5、执行 git push origin [branch_name]

然后在 shopping 文件夹中执行（那个目录含有.git 文件夹，就在哪个目录进行提交）：

```bash
git add .
git commit -m 'day01'
git push
```

成功提交

## 配置脚手架

### 配置路径

在`jsconfig.json`文件中，配置如下:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  // 不能在哪里使用  我这里提示配置错误 所以我删除了
  "exclude": ["node_modules", "dist"]
}
```

这样就可以在文件中使用类似`@/pages/home.vue`这种写法了

### 自启动浏览器

使用`npm run serve`命令将会自动打开浏览器

只需要在`package.json`中添加`--open`

```json
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
```

> > 遇到问题
>
> 浏览器打开的是 0.0.0.0：8080 路径，导致什么都没有
>
> > 解决办法
>
> 在`vue.config.js`文件夹中配置：
>
> ```js
> module.exports = defineConfig({
>   transpileDependencies: true,
>   lintOnSave: false,
>   // 配置如下
>   devServer: {
>     open: true,
>     host: 'localhost',
>     port: 8080,
>   },
> });
> ```
>
> 至此问题解决
>
> > 遇到问题
>
> vue--Parsing error: No Babel config file detected for 。。。。错误
>
> > 解决办法
>
> 在 package.json 文件下找到"parserOptions"，添加："requireConfigFile" : false 即可，如下：
>
> ```js
> "eslintConfig": {
>     "root": true,
>     "env": {
>       "node": true
>     },
>     "extends": [
>       "plugin:vue/essential",
>       "eslint:recommended"
>     ],
>     "parserOptions": {
>       "parser": "@babel/eslint-parser",
>       "requireConfigFile": false
>     },
>     "rules": {}
>   },
> ```

### 关闭 eslint 语法检查

在`vue.config.js`中配置`lintOnSave:false`

> > 遇到问题
>
> eslint 怎么关闭也关不掉，一直有问题
>
> > 解决方法
>
> vscode 中 Eslint 插件删除

## 配置路由

### 安装路由

使用`cnpm i vue-router`安装路由

> > 遇到问题
>
> 直接安装的路由可能会导致错误
>
> > 错误原因
>
> 直接安装的路由为 4 版本，不支持 vue2，只支持 vue3
>
> > 解决办法
>
> 指定路由版本，使用`cnpm i vue-router@3`安装即可

### 创建路由组件

路由相关的组件一般我们放在`pages || views`文件夹中

而静态组件/全局组件我们放在`components`文件夹中

### 创建路由页面

新建`pages`文件夹，在此文件夹下新建`Home`,`Login`,`Register`,`Search`

目录结构如下：

> |\_pages
>
> ​ |\_Home
>
> ​ |\_index.vue
>
> ​ |\_Login
>
> ​ |\_index.vue
>
> ​ |\_Register
>
> ​ |\_index.vue
>
> ​ |\_Search
>
> ​ |\_index.vue

### 配置路由组件

在`src`文件夹下新建`router`文件夹，在此文件夹下新建`index.js`文件

配置操作如下：

1. 引入 Vue
2. 引入 vue-router
3. 使用插件 vue-router
4. 引入路由页面
5. 导出路由组件

如下配置：

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
});
```

### 安装 less

想要在 vue-cli 项目中使用 less，首先安装

`cnpm i less less-loader`

然后在需要使用 less 的组件中`<style>`标签上添加 lang='less'如下

```vue
<style scoped lang="less"></style>
```

### 使用路由

在 App.vue 中需要使用路由的地方添加`<router-view></router-view>`

在 main.js 中使用路由

```js
// 引入路由
import router from './router';

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
```

### 路由属性

**$route**

一般获取路由信息（路径，query，params 等）

**$router**

一般进行编程式导航进行路由跳转（push、replace）

> > 注册完路由后，不管是路由组件还是非路由组件都会含有这两个属性

### 路由重定向

在路由 index.js 中配置重定向（当用户进入/时自动定向到 Home 首页）

```js
routes: [
  {
    path: '/',
    redirect: '/home',
  },
];
```

### 路由的跳转

路由跳转有两种形式：

声明式导航 router-link，可以进行路由的跳转

对于一些不太需要复杂的逻辑的，只是简单的使用跳转，使用这个

编程式式导航 push | replace，可以进行路由的跳转

有一些比较复杂的业务流程时，使用

### 业务

> > 效果
>
> 想要在登录和注册时不显示底部 Footer，其他路由都显示
>
> > 实现
>
> 使用路由元信息，在路由配置中加入 meta:{}，括号中使用的是我们要配置的信息
>
> > 代码
>
> ```js
> routes: [
>     {
>       path: '/home',
>       component: Home,
>       meta: {
>         show: true,
>       },
>     },
>   ],
> ```
>
> > 使用
>
> 在需要使用的地方使用$route.meta.show

### 路由传参

> > 介绍
>
> `params`参数：属于路径中的一部分，在配置路由的时候，需要占位
>
> `query`参数：不属于路径中的一部分，类似于 ajax 中的 queryString，例如：/home?k=v&kv=，不需要占位
>
> > 1.  使用 params
>
> 在路由页面需要占位
>
> > 代码
>
> router/index.js
>
> ```js
> {
>     path: '/search/:keyword',
>     component: Search,
>     meta: {
>       show: true,
>     },
> },
> ```
>
> Header/index.vue
>
> ```js
> goSearch() {
>   this.$router.push('/search/' + this.keyword);
> },
> ```
>
> > 2.  使用 query
>
> 不需要占位，在路由跳转路径?后为 query
>
> > 代码
>
> ```js
> goSearch() {
>   this.$router.push('/search/' + this.keyword + "?keyword=" + this.keyword.toUpperCase());
> },
> ```
>
> > 在跳转到的页面中使用
>
> Search/index.vue
>
> ```js
> mounted() {
>   console.log(this.$route.params.keyword);
>   console.log(this.$route.query.keyword);
> },
> ```
>
> > 3.  对象写法（最常用的）
>
> 需要给路由起一个名
>
> > 代码
>
> router/index.js
>
> ```js
> {
>   path: '/search/:keyword',
>   component: Search,
>   meta: {
>       show: true,
>   },
>   name: 'search',
> },
> ```
>
> Header/index.vue
>
> ```js
> this.$router.push({
>   name: 'search',
>   params: { keyword: this.keyword },
>   query: { k: this.keyword.toUpperCase() },
> });
> ```

# Day02

> > 问题
>
> 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出 NavigationDuplicated 的警告错误?
>
> ![image-20221106204912036](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20221106204912036.png)
>
> > 注意
>
> 注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
>
> 这种异常，对于程序没有任何影响的。
>
> > 原因
>
> 由于 vue-router 最新版本 3.5.2，引入了 promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
>
> > 解决方案
>
> 第一种解决方案：是给 push 函数，传入相应的成功的回调与失败的回调，可以暂时解决当前问题，但是以后再用 push|replace 还是会出现类似现象，因此我们需要从‘根’治病；
>
> 第二种：重写 VueRouter 中的 push 以及 replace 方法
>
> router/index.js
>
> ```js
> let originPush = VueRouter.prototype.push;
> let originReplace = VueRouter.prototype.replace;
> VueRouter.prototype.push = function (location, resolve, reject) {
>   if (resolve && reject) {
>     originPush.call(this, location, resolve, reject);
>   } else {
>     originPush.call(
>       this,
>       location,
>       () => {},
>       () => {}
>     );
>   }
> };
> VueRouter.prototype.replace = function (location, resolve, reject) {
>   if (resolve && reject) {
>     originReplace.call(this, location, resolve, reject);
>   } else {
>     originReplace.call(
>       this,
>       location,
>       () => {},
>       () => {}
>     );
>   }
> };
> ```

## 注册全局组件

目录结构：

pages/Home/TypeNav/index.vue

index.vue

```vue
<script>
export default {
  name: 'TypeNav',
};
</script>
```

在 main.js 中

```js
import TypeNav from '@/pages/Home/TypeNav';
// 注册全局组件
// 三个参数：1. 全局组件的名字 2. 哪一个组件
Vue.component(TypeNav.name, TypeNav);
```

## axios 二次封装

一般在项目中都会有一个 api 文件夹用于发起二次封装 axios

在 src 文件夹下新建 api 文件夹，新建 request.js 文件

编写代码:

```js
import axios from 'axios';
// 1.利用axios对象的方法，创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径之中会自动拼上api
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000,
});
// 请求拦截器，只要发请求，就可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，对象里边有一个属性很重要，就是header请求头
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 当响应成功时的回调
    return res.data;
  },
  // 当响应失败的回调
  (error) => {
    return Promise.reject(new Error('fail'));
  }
);
export default requests;
```

## 统一管理接口

项目很小：完全可以在组件的生命周期函数中发请求

项目大（请求多）：最好将所有的 api 接口进行统一管理

在 api 文件夹下新建 index.js 文件，此文件将对 api 进行统一管理]

```js
// 进行api的统一管理
import requests from './request';

// 三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// axios法请求返回结果是Promise对象

export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' });
```

## 跨域问题

**什么是跨域**

协议、域名、端口号不同请求，称之为跨域

**怎么解决跨域**

JSONP、CORS、代理服务器

**解决**

在 webpack.config.js 中设置代理服务器（在 Vue 项目中，vue.config.js 就相当于 webpack.config.js）

```js
devServer: {
    // 设置代理
    proxy: {
      // 哪个请求带 /api ，哪个请求就使用代理服务器
      '/api': {
        // 转发到哪个服务器
        target: 'http://39.98.123.211',
      },
    },
  },
```

## 浏览器进度条

在浏览器中，我们经常看到上方会有浏览器的进度条，我们想要实现的效果就是当发送请求时，上方进度条出现

使用 `nprogress`库，cnpm 安装。

由于我们想要在发起请求时使用进度条，在获得数据时结束进度条，最好的地方就是在 请求拦截器 以及 相应拦截器使用。

> > 使用
>
> nprogress:
>
> ​ start():进度条开始
>
> ​ done():进度条结束
>
> > 注意
>
> 使用之前需要先引入 nprogress 的样式
>
> import 'nprogress/nprogress.css';
>
> 进度条的样式可以进行设置，方法：
>
> 在 node_modules 中找到 nprogress.css，在文件中\#nprogress .bar{background-color:}就是背景颜色，修改即可

## vuex 状态管理库

vuex 是官方提供的一个插件，状态管理库，集中式管理项目中组件公用的数据。

切记，并不是全部项目都需要 Vuex，如果项目很小，完全不需要 vuex，如果项目很大，组件很多，数据很多，数据维护费劲，可以使用 vuex

一般在项目中都会有一个 store 文件夹，其中都是 vuex 相关

store/index.js

```js
import Vue from 'vue';
import vuex from 'vuex';
// 使用插件
Vue.use(vuex);
// state：仓库存储数据的地方
const state = {};
// mutations：修改state的唯一手段
const mutations = {};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
// 对外暴露store类的实例
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
```

在 main.js 中引入 vuex

main.js

```js
// 引入vuex
import store from '@/store';
// 注册
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
```

## 使用 vuex

> > 使用
>
> 首先想要使用可以引入 mapState，也可以直接使用 this.$store.state 进行使用 store 中的值。
>
> 想要对值进行修改，需要使用 dispatch("触发事务","参数")将事务提交。
>
> 在 action 中定义这个事务（注意这里的名字最好是小写），接收两个参数，上下文、参数，并对 mutations 进行提交。
>
> mutations 接受的事务以及参数（注意这里的函数名都使用大写），并对 state 中的数据进行修改。
>
> > 使用过程
>
> 1.  读取时
>
> 在需要使用的组件中引入 mapState
>
> `import mapState from 'vuex'`
>
> 在计算属性中提取需要的属性
>
> ```js
> computed: {
>   count() {
>     // 或者
>     return this.$store.state.count;
>   },
>   // 与上边那句话相同
>   // ...mapState(['count']),
> },
> ```
>
> 页面上使用{{count}}即可使用
>
> 2.  改变时
>
> 要改变 store 中的数据，首先在 store/index.js 中 action 中填写
>
> ```js
> const actions = {
>   // context 为函数的上下文，其中包含commit以及state
>   // option 为传过来的参数
>   add(context, option) {
>     // 这里将会提交 ADD 这个事务给 mutations
>     context.commit('ADD', option.num);
>   },
>   inc(context, option) {
>     context.commit('INC', option.num);
>   },
> };
> ```
>
> 编写 mutations
>
> ```js
> // mutations：修改state的唯一手段
> const mutations = {
>   // 第一个参数为此处的这个state，第二个参数为 action 传过来的参数
>   ADD(state, count) {
>     state.count += count;
>   },
>   INC(state, count) {
>     state.count--;
>   },
> };
> ```
>
> 在页面中派发事件
>
> ```vue
> <script>
> export default {
>   computed: {
>     count() {
>       return this.$store.state.count;
>     },
>     // ...mapState(['count']),
>   },
>   methods: {
>     add() {
>       // 派发add事件  传递参数为3
>       this.$store.dispatch('add', { num: 3 });
>     },
>     inc() {
>       this.$store.dispatch('inc');
>     },
>   },
> };
> </script>
> ```

**从需要使用的组件位置引入 mapState**，这里仅仅是模拟一下使用过程

index.vue

```vue
<template>
  <button @click="inc">-1</button>
  <span>仓库中的数据：{{ count }}</span>
  <button @click="add">+1</button>
</template>
<script>
// 引入 mapState
import {mapState} from 'vuex'
export default {
    name:...
    components:...
    computed(){
        // 结构赋值
        mapState([...count])
    },
    methods: {
        add() {
            // 派发add事件
            this.$store.dispatch('add');
        },
        inc() {
            this.$store.dispatch('inc');
        },
    },
}
</script>
```

store/index.js

```js
import Vue from 'vue';
import vuex from 'vuex';
// 使用插件
Vue.use(vuex);
// state：仓库存储数据的地方
const state = {
  count: 0,
};
// mutations：修改state的唯一手段
const mutations = {
  // 第一个参数为此处的这个state，第二个参数为用户传过来的参数
  ADD(state, count) {
    state.count++;
  },
  INC(state, count) {
    state.count--;
  },
};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  add({ commit }) {
    commit('ADD');
  },
  inc({ commit }) {
    commit('INC');
  },
};
```

## vuex 模块化开发

> > 问题引出
>
> 对于 vuex，如果系统足够大，将所有的数据都保存在一个 store 中将会导致模块过于庞大，那么我们就可以使用模块化开发了
>
> > 实现
>
> 将四个模块均导出为一个个小模块
>
> /store/home/index.js /store/search/index.js
>
> ```js
> // Home 模块的仓库
> const state = {};
> const mutations = {};
> const actions = {};
> const getters = {};
> export default {
>   state,
>   mutations,
>   actions,
>   getters,
> };
> ```
>
> /store/index.js 统一管理
>
> ```js
> import Vue from 'vue';
> import vuex from 'vuex';
> // 使用插件
> Vue.use(vuex);
> // 引入小仓库
> import home from './home';
> import search from './search';
>
> export default new vuex.Store({
>   // 实现vuex仓库模块式开发储存数据
>   modules: {
>     home,
>     search,
>   },
> });
> ```

## 使用 vuex 组件化

在 TypeNav/index.vue 中

```vue
<script>
export default {
  name: 'TypeNav',
  mounted() {
    // 通知vuex发请求，获取数据，储存于仓库中
    this.$store.dispatch('categoryList');
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>
```

home/index.js

```js
import { reqCategoryList } from '@/api/index.js';

// Home 模块的仓库
const state = {
  // 初始值根据获得的数据设置类型
  categoryList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data);
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
```

# day03

## 防抖、节流

> > 问题引入
>
> 正常情况下：鼠标进入，每一个分类都会触发鼠标经过事件
>
> 然而（用户操作过快）：本来是应该所有的都触发鼠标经过事件，然而只有少数的触发了事件。
>
> 这是因为用户行为过快，导致浏览器反应不过来。如果在当前回调函数中有大量业务，会出现卡顿现象
>
> > 概念
>
> 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发。
>
> 防抖：前面的所有的触发都被取消，最后一次在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次(在用户输入完成后只发送一次请求)
>
> > 简单的防抖
>
> 用户操作很频繁，但是只执行一次
>
> 这里我们处理防抖使用<a href="https://www.lodashjs.com/">Lodash</a> 这个插件
>
> ```js
> let input = document.qureySelector('input');
> input.oninput = _.debounce(function () {
>   console.log('ajax发请求');
> }, 1000);
> ```
>
> 这样就实现了一个简单的防抖，在用户输入完成一秒钟之后才会发起请求
>
> > 简单的节流
>
> 用户操作很频繁，但是把频繁的操作变为少量操作。
>
> 实现让用户在 1s 之内只能执行一次
>
> ```js
> let span = document.querySelector('span');
> let button = document.querySelector('button');
> let count = 0;
> button.onclick = _throttle(function () {
>   count++;
>   span.innerHTMl = count;
> }, 1000);
> ```

## 三级联动路由跳转与传递参数

1. 判断用户点击的是否是 a 标签

```js
// 在每个a 标签上添加一个属性:data-categoryname="item.categoryName"
// 判断这个属性，只要拥有这个属性的就一定是a标签
let element = event.target;
let { categoryname } = element.dataset;
if (categoryname) {
  alert(123);
}
// 一旦html元素中有一个属性添加了 data- 前缀，那么这个属性就可以通过 dataset 直接拿到
```

## 简单性能优化

> > 问题
>
> 在之前的代码中，我们可以发现，每次用户切换 search 以及 home 都会发送一次请求，这是因为请求写在 TypeNav 中，只要使用这个组件就会发起请求，这样完全会浪费资源。
>
> > 解决
>
> 在 Vue 中，app.vue 这个组件只会运行一次，所以我们可以将发起请求的部分放到 app.vue 中。

# day04

## 使用 mock 模拟数据

由于这两个组件服务器没有提供，所以这里我们需要新使用一个技术：

mock 数据（模拟）：如果你想模拟一些技术，需要用到一个插件 mock.js

> > 使用方法
>
> 1. 在项目当中 src 文件夹下创建 mock 文件夹
> 2. 准备 JSON 文件（mock 文件夹中创建对应的 JSON 文件）记得格式化一下，别留有空格，会导致项目跑不起来
> 3. 把 mock 数据需要的图片放置到 public 文件夹中【public 文件夹在打包时，会将相应的资源原封不动的打包到 dist 文件夹中】
> 4. 开始 mock（虚拟数据）在 mock 文件夹下创建 mockServe.js 文件
> 5. mockServe.js 在 main.js 中引入一下
>
> > 注
>
> JSON 数据格式可以直接引用，不需要对外暴露
>
> 原因：webpack 默认对外暴露：图片、JSON 数据格式
>
> > 代码
>
> mockServe.js
>
> ```js
> // 引入mockjs 模块
> import Mock from 'mockjs';
> // 导入两个json文件【JSON数据格式不需要对外暴露，但是可以引入】
> // webpack默认对外暴露的：图片、JSON数据格式
> import banner from './banner.json';
> import floor from './floor.json';
>
> // mock数据:第一个参数为请求地址，第二个参数：请求数据
> Mock.mock('/mock/banner', { code: 200, data: banner });
> Mock.mock('/mock/floor', { code: 200, data: floor });
> ```
>
> main.js
>
> ```js
> // 引入mockServe
> // 这里这个mockServe相当于启动了一个服务器，所以并不需要暴露，只需要引入让其执行一下，服务就启动了
> import '@/mock/mockServe.js';
> ```
>
> store/home.js
>
> ```js
> import { reqCategoryList, reqGetBannerList } from '@/api/index.js';
>
> // Home 模块的仓库
> const state = {
>   // 初始值根据获得的数据设置类型
>   bannerlist: [],
> };
> const mutations = {
>   BANNERLIST(state, bannerList) {
>     state.bannerlist = bannerList;
>   },
> };
> const actions = {
>   async getBannerList({ commit }) {
>     let result = await reqGetBannerList();
>     if (result.code == 200) {
>       commit('BANNERLIST', result.data);
>     }
>   },
> };
> ```
>
> 新建 api/mockAjax.js 文件，代码与 request.js 基本相同
>
> ```js
> const requests = axios.create({
>   // 配置对象
>   // 唯一这里不一样，改成/mock
>   baseURL: '/mock',
>   // 请求超时时间
>   timeout: 5000,
> });
> ```

## swiper 使用

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="dist/css/swiper-bundle.min.css" />
    <style>
      .swiper {
        width: 600px;
        height: 300px;
      }
    </style>
  </head>
  <body>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
    <script src="dist/js/swiper-bundle.min.js"></script>
    <script>
      // 在new Swiper之前，页面的结构必须先有
      var mySwiper = new Swiper('.swiper', {
        direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          // 能否点击切换
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
    </script>
  </body>
</html>
```

注意：在使用 new Swiper 之前页面结构必须已经有了

watch 的使用：

```js
watch: {
   // 对象写法，监听bannerList的改变
   bannerList: {
       handler(newValue, oldValue) {

       },
   },
},
// 也可以这样写 这样写就无法对监听做一些配置
watch: {
   bannerList(newValue,oldValue) {

   }
}
```

> > 问题
>
> 不要再 mounted 中使用 new Swiper，因为这时候的异步请求，v-for 的数据还不完整
>
> > 问题解决
>
> 使用 watch 监听 bannerList 的变化，但是，仅仅使用 watch，还是无法实现这个效果，原因是虽然你已经监视了这个变量的改变，但是你无法知道 for 遍历什么时候结束，不知道什么时候结束就代表着，刚开始改变你这边就渲染，然而那边的 for 循环还没有将 dom 展示出来。
>
> 用人话来说，你可以监视到数据改变了，但是你没有办法保证 for 已经渲染好了
>
> > 完美解决
>
> watch + nextTick()
>
> > $nextTick()
>
> 在下次 dom 更新（数据已经更新完），循环结束（for 循环渲染 DOM）之后（这两句话代表着这个 DOM 已经真是存在了）执行延迟回调。再修改数据之后（服务器的数据已经回来了）立即使用这个方法，获取更新后的 DOM.
>
> 使用这个方法，可以保证 DOM 结构已经有了，再进行操作 DOM
>
> > 代码
>
> ```js
> watch: {
>     bannerList: {
>       handler(newValue, oldValue) {
>         this.$nextTick().then(() => {
>           var mySwiper = new Swiper('.swiper-container', {
>             loop: true, // 循环模式选项
>
>             // 如果需要分页器
>             pagination: {
>               el: '.swiper-pagination',
>               // 能否点击切换
>               clickable: true,
>             },
>
>             // 如果需要前进后退按钮
>             navigation: {
>               nextEl: '.swiper-button-next',
>               prevEl: '.swiper-button-prev',
>             },
>
>             // 如果需要滚动条
>             scrollbar: {
>               el: '.swiper-scrollbar',
>             },
>           });
>         });
>       },
>     },
>   },
> ```

## 组件通信

props：父子组件通信

自定义事件：@on @emit 可以实现子给父通信

全局事件总线：$bus 全能

pubsub-js：vue 中几乎不用 全能

插槽

vuex

# day05

## 全局组件

在多个地方需要使用的组件我们可以拆分为全局组件，以便使用。

使用方法：

1. 首先将全局组件拆分到 components 文件夹下

2. 为全局组件 name 命名，注意一定要进行命名

3. 在入口文件 main.js 引入全局组件

   `import Carsousel from '@/components/Carsousel'`

4. 注册全局组件（第一个参数为组件的名字（name 属性）第二个参数为组件）

   `Vue.component(Carsousel.name,Carsousel)`

5. 之后在全局的任何位置使用组件名字都可以

6. 全局组件中如果需要数据，可以使用 props 为组件传递数据

## 搜索组件仓库

这里为了简化数据，使用 getters。

getters：为了简化仓库中的数据而生，可以把我们将来在组件中需要用的数据简化一下（将来组件在获取数据的时候就方便了）

```js
const getters = {
  // 这里的这个state 是当前仓库的state，并非大仓库中的哪个state
  // 有点像是compunted的使用，返回的这个goodList可以直接使用
  goodsList(state) {
    return state.searchList.goodsList;
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
```

由于这个 state 中的 searchList 层级过多，在每个组件中使用时容易出现错误，使用 getter 将每个内容单独抽离出来。

使用：

```js
import { mapGetters } from 'vuex';

computed: {
    ...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
},
```

mapGetter 里边的用法：传递的是一个数组，getters 计算没有划分模块，只要这个数据在仓库中，就能拿到

## 搜索请求

搜索这个接口需要很多参数，具体：

```js
data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: '',
      },
    };
  },
```

发起请求之前，咱们用 beforeMount 将数据整合一下：

```js
 beforeMount() {
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;

    // 简单的写法 这个写法会将后边两个都合并到第一个上，有的则合并
     Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
```

## 监听路由信息

监听路由信息，只要路由信息改变就重新发送请求（路由信息的改变代表着用户选择的内容改变）

```js
watch: {
    $route(newValue, oldValue) {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        console.log(this.searchParams);
        this.getData();
    },
},
```

带给服务器的参数如果是可有可无的，那么设置为空字符串可能会造成一些性能上的问题。那么我们可以设置为 undefined，被设置为 undefined 的数据不会被发送到服务器

更新路由信息：

将`http://localhost:8080/#/search?categoryName=手机&category3Id=178`

改为`http://localhost:8080/#/search`：

只需要在需要更改的地方重新跳转一下就好啦

# day06

## 全局事件总线

在点击删除面包屑后，我们希望 header 中的搜索栏中的数据也被删除，这就涉及到了兄弟之间通信，我们使用全局事件总线 $bus 完成

> > 说明
>
> 全局事件总线可用于任何场景，不管是父子，兄弟，还是后代都没问题。
>
> > 步骤
>
> 1. 在入口文件也就是 main.js 中注册全局事件总线（在 Vue 的原型上注册$bus 事件，使其等于 this）
> 2. 在需要通知兄弟组件的位置发布事件（this.$bus.$emit('事件名')）
> 3. 在被通知组件上接收事件并执行（this.$bus.$on('事件名',回调函数)）
> 4. 如果需要传递参数，则在 this.$bus.$emit('事件名','形参')传递，this.$bus.$on('事件名',(实参)=>{})接收
>
> > 使用
>
> main.js: 注册全局事件总线
>
> ```js
> new Vue({
>   render: (h) => h(App),
>   // 注册全局事件总线
>   beforeCreate() {
>     Vue.prototype.$bus = this;
>   },
>   router,
>   store,
> }).$mount('#app');
> ```
>
> Search/index.vue:通知兄弟组件 Header 清除关键字
>
> ```js
> removeKeyword() {
>     // 通知兄弟组件Header清除关键字
>     this.$bus.$emit('clear');
> }
> ```
>
> components/Home/index.vue
>
> ```js
> mounted() {
>     // 触发事件产生回调，将关键字清空
>     this.$bus.$on('clear', () => {
>         this.keyword = '';
>     });
> },
> ```

## 父子通信

这里我们想将子组件中点击品牌给父组件传过去，使用父子通信，当然也可以使用全局事件总线。

> > 说明
>
> 父子通信父传子一般都是使用自定义事件，父亲使用@事件名，儿子使用@emit 触发。
>
> > 步骤
>
> 1. 父亲给子组件传递自定义事件(@Customize("形参")="儿子触发事件之后的回调")
> 2. 子组件在需要触发的位置触发(this.$emit("Customize"),"实参")
>
> > 实现
>
> 父：pages/Search/index.vue
>
> ```vue
> <template>
>   <SearchSelector @trademarkInfo="trademarkInfo" />
> </template>
> <script>
> export default {
>   methods: {
>     trademarkInfo(trademark) {
>       console.log('我是父组件', trademark);
>     },
>   },
> };
> </script>
> ```
>
> 子：pages/Search/SearchSelector/SearchSelector.vue
>
> ```vue
> <template>
>   <li
>     v-for="(trademark, index) in trademarkList"
>     :key="trademark.tmId"
>     @click="traderMarkHandle(trademark)"
>   >
>     {{ trademark.tmName }}
>   </li>
> </template>
> <script>
> export default {
>   methods: {
>     traderMarkHandle(trademark) {
>       this.$emit('trademarkInfo', trademark);
>     },
>   },
> };
> </script>
> ```

## 排序操作

需要发送请求数据为：1.综合 2.价格 asc：升序 desc：降序

**使用阿里巴巴矢量图标库**

1. 在想要的图标上选中购物车，添加到项目中

2. 点击在线链接。
3. 复制在线的样式，将其添加到 public/index.html 头部中
4. 使用：`<i class="iconfont icon-up"></i>`

# day07

## 分页器（Pagination）

**为什么很多项目都要使用分页器？**

因为一般项目中都会有很大量的数据，如果一次性都请求过来会对浏览器造成卡顿。

**分页器展示，需要哪些数据（条件）？**

1. 需要知道当前是第几页：pageNo 代表当前页数
2. 需要知道每一个需要展示多少条数据：pageSize 字段代表每页数据个数
3. 需要知道整个分页器一共有多少条数据：total 字段代表数据总数
4. 需要知道分页器连续的页面个数：continues 分页连续页码个数 5 | 7（一般都是奇数，因为对称）

**将分页器功能弄成全局组件。**

在 components 下创建 Pagination 文件夹，新建 index.vue 文件

实现：

1. 计算出一共有多少页：

```js
totalPage(){
    return Math.ceil(this.total/this.pageSize)
}
```

2. 计算出连续的起始数字和结束数字（比如当前为第五页，那么 3，4，5，6，7）

```js
startNumAndEndNum() {
    const { continues, pageNo, totalPage } = this;
    // 先定义两个变量储存起始数字和结束数字
    let start = 0,
        end = 0;
    if (continues > totalPage) {
        start = 1;
        end = totalPage;
    } else {
        start = pageNo - 2;
        end = pageNo + 2;
        if (start < 1) {
            start = 1;
            end = continues;
        }
        if (end > totalPage) {
            end = totalPage;
            start = end - continues + 1;
        }
    }
    console.log(start, end);
    return { start, end };
}
```

接着就是一些细节

Pagination/index.vue

```vue
<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>

    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      :class="{ active: pageNo == page }"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', total)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  methods: {},
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量储存起始数字和结束数字
      let start = 0,
        end = 0;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - 2;
        end = pageNo + 2;
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = end - continues + 1;
        }
      }
      console.log(start, end);

      return { start, end };
    },
  },
};
</script>
```

Search/index.vue

```vue
<template>
  <Pagination
    :pageNo="searchParams.pageNo"
    :pageSize="searchParams.pageSize"
    :total="total"
    :continues="5"
    @getPageNo="getPageNo"
  />
</template>
<script>
export default {
    data() {
        return {
          searchParams: {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            categoryName: '',
            keyword: '',
            order: '1:desc',
            pageNo: 1,
            pageSize: 5,
            props: [],
            trademark: '',
      	  },
       }
    };
    methods:{
    	getPageNo(pageNo) {
          this.searchParams.pageNo = pageNo;
          this.getData();
          console.log(pageNo);
        },
	}
}
</script>
```

## 详情页

1. 引入 detail 之后，为 search 中的商品绑定点击事件，创建路由信息，接收一个 goodid 参数。

   > 但是目前有一个问题：
   >
   > 当滚轮滚到底部时，点击商品，跳转到商品详情页滚轮依旧在最底下。
   >
   > 这里 Vue 也为我们给出了解决方案，使用 scrollBehavior() 函数，使用如下

   ```js
   export default new VueRouter({
     routes,
     scrollBehavior(from, to, savedPosition) {
       return { y: 0 };
     },
   });
   ```

​ 这里 scrollBehavior()返回的 x ，y 就是我们的滚轮坐标，把滚轮的 y 设置为 0（单位：px），即可实现功能。

2. 创建 api 访问接口。

   ```js
   export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
   ```

3. vuex 获取产品详情信息

   ```js
   const state = {
     goodInfo: {},
   };
   const mutations = {
     GETGOODINFO(state, goodInfo) {
       state.goodInfo = goodInfo;
     },
   };
   const actions = {
     // 获取产品信息
     async getGoodInfo({ commit }, skuId) {
       let result = await reqGoodsInfo(skuId);
       if (result.code == 200) {
         commit('GETGOODINFO', result.data);
       }
     },
   };
   const getters = {
       categoryView(state) {
       return state.goodInfo.categoryView || {};
   };
   export default {
     state,
     mutations,
     actions,
     getters,
   };
   ```

## 放大镜效果

在电商平台中，我们常常见到比如放大镜这样的效果，例如：

![放大镜效果](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20221116191551178.png)

这样的效果是怎么实现的呢，他主要由三部分组成：

1. 原始图片
2. 放大图片
3. 遮罩层

首先研究遮罩层，当鼠标移入图片中，遮罩层的位置也随之改变思路如下：

1. 我们可以先设定好一个遮罩层，给其指定宽高（为图片大小的一半），并设置定位 position，后期我们需要改变这个 left 以及 top 实现遮罩层的位置改变。

   ```html
   <!-- 遮罩层 -->
   <div class="mask"></div>
   <!--这里使用的为 less-->
   <style lang="less">
     .mask {
       // 设置宽高为大盒子的一ban
       width: 50%;
       height: 50%;
       // 设置背景颜色
       background-color: rgba(0, 255, 0, 0.3);
       // 设置定位
       position: absolute;
       // 设置初始位置
       left: 0;
       top: 0;
       // 默认不显示，当鼠标移入时显示
       display: none;
     }
     // 当鼠标移入时显示
     .event:hover ~ .mask,
     .event:hover ~ .big {
       display: block;
     }
   </style>
   ```

2. 当鼠标移入图片时会触发鼠标移动（mousemove）事件，并会传入一个 event 事件对象，其中包含的 offsetX,offsetY（相对于这个图片边界的 X，Y 值）就是我们需要的内容，使用 event.offsetWidth(offsetHeight) 可以获取当前元素的宽高。

3. 获取 mask 节点，当鼠标移动时，改变 mask 的 left 和 top，注意：这里的 left 以及 top，应当是

   鼠标当前位置相对于图片边界坐标 - mask 元素的宽高的一半，也就是：

   ```js
   let left = event.offsetX - mask.offsetWidth / 2;
   let top = event.offsetY - mask.offsetHeight / 2;
   mask.style.left = left + 'px';
   mask.style.top = top + 'px';
   ```

   基础功能实现，但是现在遮罩层可以超出边界，如下图：

   ![遮罩层超出边界](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20221116193454693.png)

4. 所以我们需要添加一些判断。如果两项相减小于 0，就让这个宽高等于 0；如果两项相减大于 mask 的宽高，就让这个值等于 mask 的宽高；

   ```js
   let mask = this.$refs.mask;
   let left = event.offsetX - mask.offsetWidth / 2;
   let top = event.offsetY - mask.offsetHeight / 2;
   // 约束范围
   if (left <= 0) left = 0;
   if (left >= mask.offsetWidth) left = mask.offsetWidth;
   if (top <= 0) top = 0;
   if (top >= mask.offsetHeight) top = mask.offsetHeight;
   mask.style.left = left + 'px';
   mask.style.top = top + 'px';
   ```

   实现功能如下：

   ![遮罩层实现](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20221116193904542.png)

实现完遮罩层的功能之后，我们要试着实现放大镜的功能了。

1. 定义一个放大镜的盒子，命名为 big，放大镜的原理就是，将区域图片的宽高都放大一倍，就像是放大了一样。

   ```html
   <div class="big">
     <img src="imgUrl" />
   </div>
   <style lang="less">
     .big {
       // 定义盒子的宽高，这里的宽高要和原始图片宽高一致
       width: 100%;
       height: 100%;
       // 开启定位，top:0px,left:100%将放大镜与原始图片齐平
       position: absolute;
       top: 0;
       left: 100%;
       border: 1px solid #aaa;
       // 隐藏超出部分
       overflow: hidden;
       z-index: 1000;
       display: none;
       background: white;
       // 设置放大镜中的图片
       img {
         // 设置图片宽度为.big的二倍
         width: 200%;
         max-width: 200%;
         // 设置图片高度为.big的二倍
         height: 200%;
         // 设置定位，通过更改定位left以及top进行放大的同步展示
         position: absolute;
         left: 0;
         top: 0;
       }
     }
   </style>
   ```

2. 当鼠标在原始图片上移动时，改变.big 中图片的 left 以及 top。代码与上方一致，这里一定要用-2，用 2 则方向相反。

   ```js
   big.style.top = -2 * top + 'px';
   big.style.left = -2 * left + 'px';
   ```

3. 至此，功能完成。

## 模拟用户 Token

这里我们需要使用一个新的库：uuid，他将随机生成一个 token

将 uuid 储存到全局本地存储中，并当作用户的唯一标识。

在 src 文件夹下新建 utils 文件夹，用于存放各种工具，在此文件夹中新建 uuid_token.js ，用于使用创建唯一标识 uuid，编写代码：

```js
import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
};
```

之后在仓库中保存我们的这个 uuid_token。

store / detail.js

```js
import { getUUID } from '@/utils/uuid_token';
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
```

在请求拦截器中，每次发起请求，都会在请求头中添加 header 请求头 uuid_token，

```js
import store from '@/store';
// 请求拦截器，只要发请求，就可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，对象里边有一个属性很重要，就是header请求头
  // 进度条开始
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  nProgress.start();
  return config;
});
```

# day10

## css 中使用 @

在 JS 中，我们很简单的可以使用 @ 代表 src 目录，那么在 css 中怎么使用呢

在 css 中，使用：`~@/assets/`

在前边添加一个 ~

## 使用 Token

通过视频我们使用接口成功获取到了我们用户的接口，现在我需要给服务器发送请求携带 Token，

将 Token 带给服务器：

1. Token 我们需要通过 header 头给服务器发送，并不存在于路径之中
2. 在发送请求之前将会触发请求拦截器，通过请求拦截器为请求添加请求头
3. 使用:`config.headers.userToken = store.state.user.token`

代码：

```js
import store from '@/store';
// 请求拦截器，只要发请求，就可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 配置对象，对象里边有一个属性很重要，就是header请求
  // 如果说store里有这个token属性，就向请求头中加入to
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
});
```

# day11

## 导航守卫

现在登录功能已经成功，但是还有两个权限问题：

1. 用户未登陆时应该无法进入购物车
2. 用户已登录应该回不到登录页面

为了解决这些问题，我们需要使用导航守卫：

1. 全局守卫，每个路由都会判断
2. 路由独享守卫：专门为一个路由判断
3. 组件内守卫：只在此组件中判断

守卫又分为：

1. 前置守卫
2. 后置守卫

使用路由守卫需要在 VueRouter 上绑定，所以：

```js
let router = new VueRouter({});
// 这样就可以设置守卫了
// from：从哪里来
// to：要去哪里
// next：只要调用z
router.beforeEach((to, from, next) => {});
// 再将其暴露
export default router;
```

使用 `to.path`可以获取到跳转到哪个路由的路径，使用`from.path`可以获取到从哪个路由进行跳转。

调用`next()`可以放行，如果不调用则无法放行；

`next()`有几种调用方式：

- `next()`直接调用，直接放行
- `next(path)`放行到指定的 path
- `next(faile)`中断当前跳转

除了前置守卫还有后置守卫，后置守卫使用方法：

```js
router.afterEach((to, from) => {});
```

这里后置路由守卫是没有 next 的

## 统一引入接口

如果不使用 vuex 进行请求接口，将数据保存到仓库中，那么我们可以在组件中进行请求：`import {reqUserInfo} from '@/api'`，但是如果一个组件中需要使用十几个接口，那这么写有些过于臃肿

解决办法：

main.js

```js
// 统一引入接口函数
import * as API from '@/api';
```

这样就实现了将所有的请求引入进来

然后：

```js
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  router,
  store,
}).$mount('#app');
```

这样之后每个组件都可以使用这个请求了

注意：最好别在生命周期函数中使用 `async`和`await`

# day12

## 引入 elementui

### 全局引入

首先下载 elementui：`cnpm i element-ui -S`

然后在 `main.js`中使用：

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
```

然后在组件中使用`this.$alert()`即可

### 按需引入

首先下载 elementui

然后安装 `babel-plugin-component -D`

然后，将`.babelrc`修改为：

```js
{
    "presets": [["es2015", { "modules": false }]],
        "plugins": [
            [
                "component",
                {
                    "libraryName": "element-ui",
                    "styleLibraryName": "theme-chalk"
                }
            ]
        ]
}
```

然后进行引入，在 main.js 中

```js
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
// 或
Vue.use(Button);
```

类似于消息弹窗这种需要在 script 中使用的，可以如此引入：

```js
import { Messagebox } from 'element-ui';
Vue.prototype.$msgbox = Messagebox;
Vue.prototype.$alert = Messagebox.alert;
```

## 根据文字生成二维码

使用接口获取到微信支付为一个字符串，如：`weixin://wxpay/bizpayurl?pr=eNHFY1pzz`

将这个文字转换成二维码就可以使用这个了，我们使用 qrcode 进行转换

首先安装：`cnpm i qrcode --save`

然后使用：

```js
import QRCode from 'qrcode';
QRCode.toDataURL(this.payInfo.codeUrl).then((res) => {
  // 这里这个res就是根据字符串生成的图片地址
});
// 也可以使用async/await
let url = await QRCode.toDataURL(this.payInfo.codeUrl);
```

# day13

## 登录守卫

在一些情景下，在未登录状态下不应该进行跳转，比如：我的订单、我的购物车、支付页面

所以，我们需要使用路由守卫来让用户无法进入这些界面，如果想要跳转，就跳转到登录界面

这个只是判断`to.path`，然后使用`next`跳转即可

但是现在有一个问题，用户点击了我的订单，然后我们检查到用户未登录，给用户到登录界面，等用户登录之后，应当直接跳转到用户想去的界面，这里我们需要这样使用

```js
if (
  to.path == '/trade' ||
  to.path == '/center/myorder' ||
  to.path == '/shopcart' ||
  to.path == '/pay'
) {
  MessageBox.alert('未登录，请先登录').then(() => next('/login?redirect=' + to.path));
}
```

这里我们把没跳转成功的地址，存储到地址栏中，这样地址就变成了

![image-20230322152950859](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20230322152950859.png)

将会保存登录之前想要跳转的地址，然后再登录界面，将登录按钮跳转页面改成：

```js
let toPath = this.$route.query.redirect;
if (toPath) {
  this.$router.push(toPath);
} else {
  this.$router.push('/home');
}
```

## 路由独享守卫

现在的效果是，如果我登录了，就可以跳转到交易页面，但是这样是不可以的，必须从购物车点击结算才能跳转到交易页面，所以我们这快需要使用路由独享守卫。

路由独享守卫：只管自己的路由，其他都不管。

在`routes.js`中设置，

```js
{
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      // 必须是从购物车才能访问交易
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
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
```

`next(false)`：中断当前跳转，从哪来回哪去

## 组件内守卫

这个用的不是很多，一般我们都使用路由独享或者全局。

只有在付款界面才能跳转到付款成功

```js
export default {
  name: 'PaySuccess',
  beforeRouteEnter(to, from, next) {
    if (from.path == '/pay') {
      next();
    } else {
      next(false);
    }
  },
};
```

组件内守卫有三个：

1. `beforeRouteEnter(to,from,next)`：在进入路由时守卫，在渲染该组件的对应路由被 confim 前调用，不能获取组件实例 this，因为当守卫执行前，组件实例还没有创建
2. `beforeRouteUpdate(to,from,next)`：在当前路由改变，但是该组件被复用时调用；比如说：对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的这个组件，因此组件实例会被调用，而这个钩子就会在这个情况下调用，可以访问组件实例 this
3. `beforeRouteLeave(to, from, next)`：导航离开该组件时调用，可以访问组件实例 this

# day14

## 图片懒加载

在图片还没有返回之前，图片预展示

这里我们使用一个插件：`vue-lazyload`

在`main.js`中，引入懒加载，并使用

```js
// 引入懒加载包
import VueLazyload from 'vue-lazyload';
// 引入默认图片
import lbxx from '@/assets/labixiaoxin.gif';
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: lbxx,
});
```

然后在需要使用图片懒加载的地方使用：

```js
<img v-lazy='good.defaultImg' />
```

## 自定义插件

自定义插件一定是一个**对象**，并且需要拥有 `install`方法，在使用`Vue.use()`时将会自动调用`install`这个方法。

```js
// 自定义插件一定是对象
let myPlugins = {};
myPlugins.install = function (vue，options) {
  console.log('调用了我自己写的插件');
};
export default myPlugins;
```

- 第一个参数为 Vue 实例
- 还可以接收第二个参数 options，这个参数就是我们所传的配置对象，比如 main.js:`Vue.use(myPlugins, {name:'hhh'})`，那么在 install 方法中，使用第二个参数就可以接收到这个参数

然后在`main.js`中：

```js
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, { name: 'upper' });
```

---

自定义指令

在`myPlugins.install`中编写：`Vue.directive(options.name,(element,params))`

所以这样我们就可以写一个插件，帮助我们实现大小写转换了，代码：

myPlugins.js

```js
// 自定义插件一定是对象
let myPlugins = {};
myPlugins.install = function (vue，options) {
  Vue.directive(options.name,(element, params)=>{
      element.innerHTML = params.value.toUpperCase()
  })
};
export default myPlugins;
```

然后在需要使用的地方使用`v-upper="abc"`，就将其转换成大写了

## 登录注册表单验证

这里为了方便，我们使用一个 vue 的表单验证插件：`vee-validate`，由于这个比较复杂，我们使用 2 版本

在 src 下新建 plugins 文件夹，在其中新建 validate.js ，这里用来做表单验证，并且引入 vee-validate。

validate.js

```js
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
```

main.js

```js
import '@/plugins/validate';
```

如果只是想让这个执行一次，并不需要`import ... from ...`

只需要使用`import url`即可

---

使用：

validata.js

```js
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  massages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`,
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    passwrod1: '确认密码',
    isCheck: '协议',
  },
});
```

在需要验证的地方使用：

```html
<div class="content">
  <label>手机号:</label>
  <input
    type="text"
    placeholder="请输入你的手机号"
    v-model="phone"
    name="phone"
    v-validate="{ required: true, regex: /^1\d{10}$/ }"
    :class="{ invalid: errors.has('phone') }"
  />
  <span class="error-msg">{{ errors.first('phone') }}</span>
</div>
<!--确认密码-->
<div class="content">
  <label>确认密码:</label>
  <input
    type="password"
    placeholder="请确认密码"
    v-model="password1"
    name="password1"
    v-validate="{ required: true, is: password }"
    :class="{ invalid: errors.has('password1') }"
  />
  <span class="error-msg">{{ errors.first('password1') }}</span>
</div>
```

自定义校验规则（验证协议框是否已选择）：

validate.js

```js
VeeValidate.Validator.extend('agree', {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + '必须同意',
});
```

```html
<div class="controls">
  <input
    type="checkbox"
    v-model="agree"
    name="agree"
    v-validate="{ required: true, agree: true }"
    :class="{ invalid: errors.has('agree') }"
  />
  <span>同意协议并注册《尚品汇用户协议》</span>
  <span class="error-msg">{{ errors.first('agree') }}</span>
</div>
```

然后在点击按钮时，进行验证，是否所有的都符合要求

```js
const success = await this.$validator.validateAll();
```

如果全部都符合要求，则会返回 true，否则会返回 false

# day15

## 路由懒加载

如果没有进行路由懒加载，那么在打包构建的时候，将会把所有的 vue 文件都构建，会影响页面加载

使用路由懒加载，就可以实现，只有访问这个路由时，才加载这个组件

在需要进行路由懒加载的地方，使用：

rou

```js

```

# 使用的插件（库）

|      库名      |                 作用                 | 安装                         |
| :------------: | :----------------------------------: | ---------------------------- |
|      Less      |       可以在脚手架中使用 less        | cnpm i less less-loader      |
|     axios      |            ajax 请求插件             | cnpm i axios                 |
|   nprogress    | 进度条插件（start 开始，done 结束）  | cnpm i nprogress             |
|     Lodash     | 包含了很多功能的 js 库（防抖和节流） | npm 自带                     |
|     mockjs     |             随机模拟数据             | cnpm i mockjs                |
|     swiper     |        pc 端和移动端的轮播图         | cnpm i swiper@5              |
|      uuid      |             临时游客身份             | npm 自带                     |
|   elementui    |              UI 组件库               | cnpm i element-ui -S         |
|     qrcode     |              生成二维码              | cnpm i qrcode --save         |
|  vue-lazyload  |                懒加载                | cnpm i vue-lazyload -S       |
| vee-validate@2 |               表单验证               | cnpm i vee-validate@2 --save |

# 面试题

1. 路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？

   使用对象写法时可以是 name、path 形式，但是需要注意的是，path 这种写法不能与 params 参数一起使用

   所以我们一般使用 name 这种写法。

2. 如何指定 params 可传可不传？

   情景：配置路由的时候，使用 params 进行占位，路由跳转的时候没传递

   结果：路径会出现问题

   解决：可以在 params 配置的时候在后边加一个` ？`(代表着参数可传可不传)

   例如：`path: '/search/:keyword?',`

3. params 可以传递也可以不传递，到那时如果传递的是空串，如何解决?

   解决：使用 undefined 解决，params 可以传，可以不传

   例如：`this.$router.push({name:'search',params:{keyword:''||undefined}})`

4. 路由跳转能不能传递 props？

   回答：可以

   代码：

   router/index.js

   ```js
   // 布尔写法
   {
      path: '/search/:keyword',
      component: Search,
      meta: {
          show: true,
      },
      name: 'search',
      props:true
   }
   // 对象写法
   {
      props:{a:1,b:2}
   }
   // 函数写法（常用）
   props:($route) => {
       return {
           keyword:$route.params.keyword,
           k:$route.query.k
       }
   }
   ```

   Search.vue/index.vue

   ```js
   // 布尔写法
   // 注意：这里使用props只能传递params，
   {
     props: ['keyword'];
   }
   // 对象写法
   {
     props: ['a', 'b'];
   }
   // 函数写法
   props: ['keyword', 'k'];
   ```

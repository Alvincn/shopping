# Day01

## 创建项目

使用`vue create sph`新建项目，选择 vue2

生成项目，项目结构如下：

> node_modules:放置项目依赖的地方
> public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
> src：程序员源代码文件夹
> -----assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
> -----components文件夹:一般放置非路由组件（或者项目共用的组件）
>   App.vue 唯一的根组件
>   main.js 入口文件【程序最先执行的文件】
>   babel.config.js:babel配置文件
>   package.json：看到项目描述、项目依赖、项目运行指令
>   README.md:项目说明文件

## 创建GitHub仓库

首先创建了一个Shopping仓库，

使用`git clone url`克隆仓库

将sph文件夹拖入到shopping文件夹中，

> > 遇到问题：
>
> 这时我在shopping文件夹中使用git commit 以及 git push 提示我在本文件夹下还有子模块
>
> 提交之后在GitHub上为一个箭头样式的文件夹且无法打开
>
> > 查找原因
>
> 原来是因为这个文件夹里面有.git隐藏文件，github 就将他视为一个子系统模块了。
>
> > 解决办法：
>
> 1、删除文件夹里面的.git文件夹
>
> 2、执行git rm --cached [文件夹名]
>
> 3、执行git add [文件夹名]
>
> 4、执行git [commit](https://so.csdn.net/so/search?q=commit&spm=1001.2101.3001.7020) -m "msg"
>
> 5、执行git push origin [branch_name] 

然后在 shopping 文件夹中执行（那个目录含有.git文件夹，就在哪个目录进行提交）：

```  bash
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
            "@/*": [
                "src/*"
            ]
        }
    },
    // 不能在哪里使用  我这里提示配置错误 所以我删除了
    "exclude": [
        "node_modules",
        "dist"
    ]
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
> 浏览器打开的是0.0.0.0：8080路径，导致什么都没有
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
> 在package.json文件下找到"parserOptions"，添加："requireConfigFile" : false即可，如下：
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

### 关闭eslint语法检查

在`vue.config.js`中配置`lintOnSave:false`

> > 遇到问题
>
> eslint怎么关闭也关不掉，一直有问题
>
> > 解决方法
>
> vscode中Eslint插件删除

## 配置路由

### 安装路由

使用`cnpm i vue-router`安装路由

>> 遇到问题
>
>直接安装的路由可能会导致错误
>
>> 错误原因
>
>直接安装的路由为4版本，不支持vue2，只支持vue3
>
>> 解决办法
>
>指定路由版本，使用`cnpm i vue-router@3`安装即可

### 创建路由组件

路由相关的组件一般我们放在`pages || views`文件夹中

而静态组件/全局组件我们放在`components`文件夹中

### 创建路由页面

新建`pages`文件夹，在此文件夹下新建`Home`,`Login`,`Register`,`Search`

目录结构如下：

>|_pages
>
>​	|_Home
>
>​		|_index.js
>
>​	|_Login
>
>​		|_index.js
>
>​	|_Register
>
>​		|_index.js
>
>​	|_Search
>
>​		|_index.js

### 配置路由组件

在`src`文件夹下新建`router`文件夹，在此文件夹下新建`index.js`文件

配置操作如下：

1. 引入Vue
2. 引入vue-router
3. 使用插件vue-router
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
})
```

### 安装less

想要在vue-cli项目中使用less，首先安装

`cnpm i less less-loader`

然后在需要使用 less 的组件中<style>标签上添加 lang='less'如下

```vue
<style scoped lang='less'></style>
```

### 使用路由

在App.vue中需要使用路由的地方添加`<router-view></router-view>`

 ### 路由属性

**$route**

一般获取路由信息（路径，query，params等）

**$router**

一般进行编程式导航进行路由跳转（push、replace）

> >  注册完路由后，不管是路由组件还是非路由组件都会含有这两个属性

### 路由重定向 

在路由index.js中配置重定向（当用户进入/时自动定向到Home首页）

```js
routes: [
    {
      path: '/',
      redirect: '/home',
    },
]
```

### 路由的跳转

路由跳转有两种形式：

声明式导航router-link，可以进行路由的跳转

 对于一些不太需要复杂的逻辑的，只是简单的使用跳转，使用这个

编程式式导航push | replace，可以进行路由的跳转

 有一些比较复杂的业务流程时，使用

### 业务



> > 效果
>
> 想要在登录和注册时不显示底部Footer，其他路由都显示
>
> > 实现
>
> 使用路由元信息，在路由配置中加入meta:{}，括号中使用的是我们要配置的信息
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

>> 介绍
>
>`params`参数：属于路径中的一部分，在配置路由的时候，需要占位
>
>`query`参数：不属于路径中的一部分，类似于ajax中的queryString，例如：/home?k=v&kv=，不需要占位
>
>> 1. 使用params
>
>在路由页面需要占位
>
>> 代码
>
>router/index.js
>
>```js
>{
>     path: '/search/:keyword',
>     component: Search,
>     meta: {
>       show: true,
>     },
>},
>```
>
>Header/index.vue
>
>```js
>goSearch() {
>   this.$router.push('/search/' + this.keyword);
>},
>```
>
>> 2. 使用query
>
>不需要占位，在路由跳转路径?后为query
>
>> 代码
>
>```js
>goSearch() {
>   this.$router.push('/search/' + this.keyword + "?keyword=" + this.keyword.toUpperCase());
>},
>```
>
>> 在跳转到的页面中使用
>
>Search/index.vue
>
>```js
>mounted() {
>   console.log(this.$route.params.keyword);
>   console.log(this.$route.query.keyword);
>},
>```
>
>> 3. 对象写法（最常用的）
>
>需要给路由起一个名
>
>> 代码
>
>router/index.js
>
>```js
>{
>   path: '/search/:keyword',
>   component: Search,
>   meta: {
>       show: true,
>   },
>   name: 'search',
>},
>```
>
>Header/index.vue
>
>```js
>this.$router.push({
>   name: 'search',
>   params: { keyword: this.keyword },
>   query: { k: this.keyword.toUpperCase() },
>});
>```
>
>

# Day02

> > 问题
>
> 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
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
> 由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
>
> > 解决方案
>
> 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调，可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
>
> 第二种：重写VueRouter中的push以及replace方法
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



在main.js中

```js
import TypeNav from '@/pages/Home/TypeNav';
// 注册全局组件
// 三个参数：1. 全局组件的名字 2. 哪一个组件
Vue.component(TypeNav.name, TypeNav);
```

## axios二次封装

一般在项目中都会有一个 api 文件夹用于发起二次封装 axios

在src文件夹下新建api文件夹，新建request.js文件

编写代码:

```js
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
```

## 统一管理接口

项目很小：完全可以在组件的生命周期函数中发请求

项目大（请求多）：最好将所有的api接口进行统一管理

在 api 文件夹下新建 index.js 文件，此文件将对api进行统一管理]

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

在webpack.config.js中设置代理服务器（在Vue项目中，vue.config.js就相当于webpack.config.js）

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

使用 `nprogress`库，cnpm安装。

由于我们想要在发起请求时使用进度条，在获得数据时结束进度条，最好的地方就是在 请求拦截器 以及 相应拦截器使用。

> > 使用
>
> nprogress:
>
> ​	start():进度条开始
>
> ​	done():进度条结束
>
> > 注意
>
> 使用之前需要先引入nprogress的样式
>
> import 'nprogress/nprogress.css';
>
> 进度条的样式可以进行设置，方法：
>
> 在node_modules中找到nprogress.css，在文件中\#nprogress .bar{background-color:}就是背景颜色，修改即可

## vuex状态管理库

vuex时官方提供的一个插件，状态管理库，集中式管理项目中组件公用的数据。

切记，并不是全部项目都需要Vuex，如果项目很小，完全不需要vuex，如果项目很大，组件很多，数据很多，数据维护费劲，可以使用vuex

一般在项目中都会有一个 store 文件夹，其中都是vuex相关

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

## 使用vuex

>> 使用
>
>首先想要使用可以引入mapState，也可以直接使用this.$store.state进行使用store中的值。
>
>想要对值进行修改，需要使用dispatch("触发事务","参数")将事务提交。
>
>在action中定义这个事务（注意这里的名字最好是小写），接收两个参数，上下文、参数，并对mutations进行提交。
>
>mutations接受的事务以及参数（注意这里的函数名都使用大写），并对state中的数据进行修改。
>
>> 使用过程
>
>1. 读取时
>
>在需要使用的组件中引入mapState
>
>`import mapState from 'vuex'`
>
>在计算属性中提取需要的属性
>
>```js
>computed: {
>   count() {
>     // 或者
>     return this.$store.state.count;
>   },
>   // 与上边那句话相同
>   // ...mapState(['count']),
> },
>```
>
>页面上使用{{count}}即可使用
>
>2. 改变时
>
>要改变store中的数据，首先在store/index.js中action中填写
>
>```js
>const actions = {
> // context 为函数的上下文，其中包含commit以及state
> // option 为传过来的参数
> add(context,option) {
>   // 这里将会提交 ADD 这个事务给 mutations
>   context.commit('ADD',option.num);
> },
> inc(context,option) {
>   context.commit('INC',option.num);
> },
>};
>```
>
>编写mutations
>
>```js
>// mutations：修改state的唯一手段
>const mutations = {
> // 第一个参数为此处的这个state，第二个参数为 action 传过来的参数
> ADD(state, count) {
>   state.count += count;
> },
> INC(state, count) {
>   state.count--;
> },
>};
>```
>
>在页面中派发事件
>
>```vue
><script>
>export default {
> computed: {
>   count() {
>     return this.$store.state.count;
>   },
>   // ...mapState(['count']),
> },
> methods: {
>   add() {
>     // 派发add事件  传递参数为3
>     this.$store.dispatch('add', { num: 3 });
>   },
>   inc() {
>     this.$store.dispatch('inc');
>   },
> },
>};
></script>
>```

**从需要使用的组件位置引入mapState**，这里仅仅是模拟一下使用过程

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

## vuex模块化开发

> > 问题引出
>
> 对于vuex，如果系统足够大，将所有的数据都保存在一个store中将会导致模块过于庞大，那么我们就可以使用模块化开发了
>
> > 实现
>
> 将四个模块均导出为一个个小模块
>
> /store/home/index.js   /store/search/index.js
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
> 
> ```

## 使用vuex组件化

在TypeNav/index.vue中

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
> let input = document.qureySelector('input')
> input.oninput = _.debounce(function(){
>     console.log("ajax发请求")
> },1000)
> ```
>
> 这样就实现了一个简单的防抖，在用户输入完成一秒钟之后才会发起请求
>
> > 简单的节流
>
> 用户操作很频繁，但是把频繁的操作变为少量操作。
>
> 实现让用户在1s之内只能执行一次
>
> ```js
> let span = document.querySelector('span')
> let button = document.querySelector('button')
> let count = 0
> button.onclick = _throttle(function(){
>     count++
>     span.innerHTMl = count
> },1000)
> ```

## 三级联动路由跳转与传递参数

1. 判断用户点击的是否是 a 标签

```js
// 在每个a 标签上添加一个属性:data-categoryname="item.categoryName"
// 判断这个属性，只要拥有这个属性的就一定是a标签
let element = event.target
let {categoryname} = element.dataset
if(categoryname){
    alert(123)
}
// 一旦html元素中有一个属性添加了 data- 前缀，那么这个属性就可以通过 dataset 直接拿到
```

## 简单性能优化

> > 问题
>
> 在之前的代码中，我们可以发现，每次用户切换search以及home都会发送一次请求，这是因为请求写在TypeNav中，只要使用这个组件就会发起请求，这样完全会浪费资源。
>
> > 解决
>
> 在Vue中，app.vue这个组件只会运行一次，所以我们可以将发起请求的部分放到app.vue中。

# day04

## 使用mock模拟数据

由于这两个组件服务器没有提供，所以这里我们需要新使用一个技术：

mock数据（模拟）：如果你想模拟一些技术，需要用到一个插件mock.js

> > 使用方法
>
> 1. 在项目当中src文件夹下创建mock文件夹
> 2. 准备JSON文件（mock文件夹中创建对应的JSON文件）记得格式化一下，别留有空格，会导致项目跑不起来
> 3. 把mock数据需要的图片放置到public文件夹中【public文件夹在打包时，会将相应的资源原封不动的打包到dist文件夹中】
> 4. 开始mock（虚拟数据）在mock文件夹下创建mockServe.js文件
> 5. mockServe.js在main.js中引入一下
>
> > 注
>
> JSON数据格式可以直接引用，不需要对外暴露
>
> 原因：webpack默认对外暴露：图片、JSON数据格式
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
> 新建api/mockAjax.js文件，代码与request.js基本相同
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

## swiper使用

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="dist/css/swiper-bundle.min.css">
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
            var mySwiper = new Swiper ('.swiper', {
                direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    // 能否点击切换
                    clickable:true
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
            })        
        </script>
    </body>
</html>
```

注意：在使用new Swiper之前页面结构必须已经有了


> > 问题
>
> 不要再mounted中使用new Swiper，因为这时候的异步请求，v-for的数据还不完整
>
> > 问题解决
>
> 使用watch监听bannerList的变化，但是，仅仅使用watch，还是无法实现这个效果，原因是虽然你已经监视了这个变量的改变，但是你无法知道for遍历什么时候结束，不知道什么时候结束就代表着，刚开始改变你这边就渲染，然而那边的for循环还没有将dom展示出来。
>
> 用人话来说，你可以监视到数据改变了，但是你没有办法保证for已经渲染好了
>
> > 完美解决
>
> watch + nextTick()
>
> > $nextTick()
>
> 在下次dom更新（数据已经更新完），循环结束（for循环渲染DOM）之后（这两句话代表着这个DOM已经真是存在了）执行延迟回调。再修改数据之后（服务器的数据已经回来了）立即使用这个方法，获取更新后的DOM.
>
> 使用这个方法，可以保证DOM结构已经有了，再进行操作DOM
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
>
> 



























# 使用的插件（库）

|   库名    |                作用                | 安装                    |
| :-------: | :--------------------------------: | ----------------------- |
|   Less    |      可以在脚手架中使用 less       | cnpm i less less-loader |
|   axios   |            ajax请求插件            | cnpm i axios            |
| nprogress | 进度条插件（start开始，done结束）  | cnpm i nprogress        |
|  Lodash   | 包含了很多功能的js库（防抖和节流） | cnpm i lodash           |
|  mockjs   |            随机模拟数据            | cnpm i mockjs           |
|  swiper   |        pc端和移动端的轮播图        | cnpm i swiper@5         |



# 面试题

1. 路由传递参数（对象写法）path是否可以结合params参数一起使用？

   使用对象写法时可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

   所以我们一般使用name这种写法。

2. 如何指定params可传可不传？

   情景：配置路由的时候，使用params进行占位，路由跳转的时候没传递

   结果：路径会出现问题

   解决：可以在params配置的时候在后边加一个` ？`(代表着参数可传可不传)

   例如：`path: '/search/:keyword?',`

3. params可以传递也可以不传递，到那时如果传递的是空串，如何解决?

   解决：使用undefined解决，params可以传，可以不传

   例如：`this.$router.push({name:'search',params:{keyword:''||undefined}})`

4. 路由跳转能不能传递props？

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
       props:['keyword']
   }
   // 对象写法
   {
       props:['a','b']
   }
   // 函数写法
   props:['keyword','k']
   ```

   

   


const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  devServer: {
    proxy: {
      // 哪个请求带 /api ，哪个请求就使用代理服务器
      '/api': {
        // 转发到哪个服务器
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
    // 是否在浏览器中打开
    open: true,
    // 在浏览器中打开的地址，不加此项将会打开0.0.0.0
    host: 'localhost',
    port: 8080,
  },
});

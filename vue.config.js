
const rt = 'http://assetlight.uat1.rs.com';
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: './',

  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: "localhost",
    port: 8000,
    // 设置代理
    proxy: {
      '/api-v1': {
        target: rt, // 域名
        ws: false, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '/api-v1': '/api-v1'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          'text-color': '#111',
          'orange':'#FFA63A',
          'green':'#03B866',
          'red':'#F85C50',
          'border-color': '#eee',
          'button-primary-background-color':'#409EFF',
          'button-primary-border-color':'#409EFF'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // hack: `true; @import "${path.join(__dirname,'../src/assets/css/_var.less')}";`
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
  }
}

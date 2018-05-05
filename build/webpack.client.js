const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // 合并webpack配置方便拆分webpack
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: 'development', // webpack4.6.0需要
  entry: {
    app: path.join(__dirname, '../client/app.js') // 使用相对路径利用path
  },
  output: {
    filename: '[name].[hash].js' // 中括号是变量
  },
  module: {},
  plugins: [// 帮忙注入js和文件
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html') // 指定插入的模版
    })]
})
// 如果是开发环境设置一些配置
if (isDev) { // 直接启动会访问不到资源，因为webpack默认访问硬盘上的资源。但是没有编译过要删除本地的dist】
  config.entry = {
    app: [
      'react-hot-loader/patch', path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 本机IP（任意）
    port: '9988',
    contentBase: path.join(__dirname, '../dist'), // 监视内容
    hot: true, // 热更新，需要配置，单独写会报错
    overlay: { // 编译错误网页提示
      errors: true // 只显示错误
    },
    publicPath: '/public/', // 统一加上路径         TODO:
    historyApiFallback: { // 404统一跳回这个资源   TODO:
      index: '/public/index.html'
    },
    proxy:{
      '/api':'http://localhost:3333'
    }
  }
  config
    .plugins
    .push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config

/**
 * 1.entry 入口
 * 2.output 输出
 * 3.module--loader
 * 4.plugins--外部插件
 * 5.       --服务渲染
 */

// 解决文件过大问题，浏览器打开我们的文件

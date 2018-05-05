const webpackMerge = require('webpack-merge') // 合并webpack配置方便拆分webpack
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development', // webpack4.6.0需要
  target: 'node', // --服务器端渲染
  output: {
    filename: 'server-entry.js', // --服务器端没有缓存
    libraryTarget: 'commonjs2' // --服务器端渲染规范
  }

})

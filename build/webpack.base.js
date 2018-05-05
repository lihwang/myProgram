const path = require('path')
module.exports = {
  entry: {
    app: path.join(__dirname, '../client/server-entry.js') // 使用相对路径利用path
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 最终生成出来的文件是/public/app.hash.js 区分路由还是静态文件 TODO:最后一个斜杠要加上
  },
  resolve: { // 导入文件时忽略后缀名字
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 编译之前啊
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [path.resolve(__dirname, '../node_modules')]
      }, {
        test: /.jsx$/,
        loader: 'babel-loader' // 安装时需babel-core  --babel 默认编译ES6，jsx编译需要配置
      }, {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [// 编译jsx语法支持ES6(因为node model里面都是js，不希望再次打包)否则weppack报超出500k错误
          path.join(__dirname, '../node_modules')]

      }
    ]
  }
}

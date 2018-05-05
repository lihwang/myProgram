const axios = require('axios') // 请求
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const asyncBootstrap =require('react-async-bootstrapper');
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.server')
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:9988/public/index.html')
      .then((res) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor // 取出module的构造函数

const mfs = new MemoryFs()

const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs // (更改为内存读写提升速度坚挺编译器)

let serverBundle ,createStoreMap;
// 监听每次编译
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }

  stats = stats.toJson()
  stats
    .errors
    .forEach((element) => {
      console.log(element)
    })
  stats
    .warnings
    .forEach((element) => {
      console.log(element)
    })

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 读取文件内容string
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 必须指定名字(将文件编译成制定文件暴露出去)
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
  console.log(createStoreMap)
})

module.exports = function (app) {
  app.use('/public', proxy({target: 'http://localhost:9988'}))
  app.get('*', function (req, res) {
    getTemplate().then((template) => {
      const routerContext={};
      const store=createStoreMap();
      const app= serverBundle(store,routerContext,req.url);
      // 服务端异步获取数据方法
      asyncBootstrap(app).then(()=>{
        if(routerContext.url){
          res.status(302).setHeader("Location",routerContext.url);
          res.end();
          return false;
        }
        console.log(store.appState.count)
        const content = ReactDomServer.renderToString(app) // 利用ReactDomServer转化字符串服务器端渲染
        res.send(template.replace('<!-- app -->', content))
      })

    })
  })
}

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session=require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const isDev = process.env.NODE_ENV === 'development'

const app = express() // 服务
console.log(path.join(__dirname, 'favicon.ico'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false} ))
app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use(session({ // session的时间
  maxAge:10*60*1000,
  name:'tid',
  resave:false,
  saveUninitialized:false,
  secret:'react cnode class' // 利用它加密
}))

app.use('/api/user',require('./util/handle-login'));
app.use('/api',require('./util/proxy'))

if (!isDev) { // 没有dist文件目录了
  // 同步读取文件
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 区分返回静态文件
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  const serverEntry = require('../dist/server-entry').default
  // node
  // 里面倒入文件使用require().会将文件全部倒入。但是es6里面导出文件时会使用default。所以在服务端引入文件时需要将后缀加上.defualt
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  // 非开发环境,将方法导入进来执行函数然后传入服务去修改
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app
  .listen(3333, function () {
    console.log('Server is listening in 3333')
  })

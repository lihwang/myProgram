 package.json
 "clear":" rimraf dist", 需要安装rimraf包。node清除当前目录下的文件夹
cross-env NODE_ENV=development  为了兼容mac window对于环境变量的设置
 memory-fs内存中读写文件 fs硬盘中读写文件
http-proxy-middleware express的一个中间件做代理

seserver文件夹
 server文件夹下server.js为express框架下的node服务
 node 里面倒入文件使用require().会将文件全部倒入。但是es6里面导出文件时会使用default。所以在服务端引入文件时需要将后缀加上.defualt
 将客户端生成好的文件读取进来然后服务器读取去渲染
 因为webpack访问硬盘未编译文件所以删除了dist，但是服务器端得访问资源，安装axios（服务起和客户端都可以发请求），使其在
优化：
1.配置icon
const favicon = require('serve-favicon')；使用这个插件在服务端加入ico
2.每次修改都要重启服务修改服务自动重启（nodemoen）nodemoen.json



webpack
通过环境区分加入更多的或者分别加载
常用配置
webpack dev server
hotModel


热更新config(webpack配置)
1.config.devServer:{
    hot:true
}
2..babelrc里配置"plugins":["react-hot-loader/babel"]
3.将babel里的react-hot-loader/patch热更新文件打包进去（react-hot-loader官方推荐做法）
config.entry={
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }

4.处理app.js
import {AppContainer} from 'react-hot-loader'
const render=Component=>{
    ReactDOM.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,root
    );
}

if(module.hot){
    module.hot.accept('./App.jsx',()=>{
        const NextApp=require('./App.jsx').default;
        // ReactDOM.hydrate(<NextApp/>,document.getElementById('root'));
        render(NextApp);
    })
}


.eslint（规范代码）
"extends":"airbnb"继承规范
“rule":修改规则
env环境变量



项目基本目录结构
views 存放项目功能模块页面
config 第三方类库和路由配置
store 存放数据管理的文件夹数据获取和封存
conponents 非业务组件：公用组件
===========================
然后配置路由
前端路由   H5的history api中控制url跳转不刷新之前利用hash；
react-router配置路由
 <Route key="1" path="/" render={() => <Redirect to="/" />}  exact />,  在启动路由时默认render执行<Redirect to="/" />跳到/中不要需要点击跳转

数据流
 .store
全局数据的监听
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/app-state';
@inject('appState') @observer

当文件需要使用参数时要引入，最好使用action 方便记录别处的同类型修改


????不懂
proxy 代理请求 webpack也有配置（）
const bodyParser = require('body-parser')用处 





react-router-dom和react-router包中的Route有什么区别？
react-router React Router 核心
react-router-dom 用于 DOM 绑定的 React Router
react-router-native 用于 React Native 的 React Router
react-router-redux React Router 和 Redux 的集成
react-router-config 静态路由配置的小助手
react-router-dom中的Route.js和Router.js，都是直接导入的react-router中的Route.js和Router.js。react-router提供的是路由的基本功能，react-router-dom根据在浏览器运行时路由的特征，在react-router之上做了一层封装，提供了HashRouter、BrowserRouter等在web端常用的路由。如果是在web端使用的话，package.json中直接引入react-router-dom就可以。





服务端渲染优化
1.服务端也要有路由，不然已进入页面就是首页
2.store 防止二次请求API
路由 使用 react-router-dom {StaticRouter}

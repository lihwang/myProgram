//    客户端渲染 打包文件自执行(主要为了配置热更新等和节点渲染操作) 实际的渲染在APP.jsx
import ReactDOM from 'react-dom';
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'mobx-react'
import AppState from './store/app-state'
import {AppContainer} from 'react-hot-loader' //eslint-disable-line
import App from './views/App'
// ReactDOM.hydrate(<App/>,document.getElementById('root'));
const root = document.getElementById('root');

const render = (Component) => {
  // 在服务端渲染和客户端首次渲染完全一致的情况下，才能使用hydrate替换render，否则自求多福吧！！！
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate
  renderMethod(<AppContainer>
    <Provider appState={new AppState()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider></AppContainer>, root);
}

render(App);

if (module.hot) {
  module
    .hot
    .accept('./views/App', () => {
      const NextApp = require('./views/App').default; //eslint-disable-line
      // ReactDOM.hydrate(<NextApp/>,document.getElementById('root'));
      render(NextApp);
    })
}

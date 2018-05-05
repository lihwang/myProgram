// 服务器端渲染（打包后为模块导出）
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider, useStaticRendering} from 'mobx-react'
import App from './views/App';
import {createStoreMap} from './store/store'
// 让mobx在服务端渲染时候不会重复数据变换
useStaticRendering(true);

// 要在Provider内传入Stroe
export default (stores, routerContext, url) => (
<Provider {...stores}>
  <StaticRouter context={routerContext} location={url}>
      <App />
  </StaticRouter>
</Provider>
)

export {createStoreMap};// 服务端渲染有用

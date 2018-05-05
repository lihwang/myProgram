import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';
// export default () => <div>This is App</div>
export default class App extends React.Component {
  componentWillUnmount() {
    // notis
  }
  render() {
    return [<div key="app"><Link to="/list" >首页</Link><br /><Link to="/detail" >详情</Link></div>, <Routes key="router" />];
  }
}

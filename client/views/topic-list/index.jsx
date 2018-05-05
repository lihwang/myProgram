import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/app-state';

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    // 你好
  }

  changeName(e) {
    this.props.appState.changeName(e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>)
  }
}
// 必须定义props的类型object必须是对象isRequired必须填写的
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

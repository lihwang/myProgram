import React from 'react';
import axios from 'axios'
/* eslint-disable */
export default class TestApi extends React.Component {
  componentDidMount() {
    console.log(1);
  }

  getTopics = () => {
    axios
      .get('/api/topics')
      .then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
  }

  login = () => {
    axios
      .post('/api/user/login', {accessToken: 'b465d3dc-1072-4b9b-bee5-aaa39dd7683e' })
      .then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
  }

  markAll = () => {
    axios
      .post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>topics</button>
        <button onClick={this.markAll}>topics</button>
      </div>
    )
  }
}
/* eslint-enable */

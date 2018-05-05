import React from 'react'
import { Route } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api.test'

export default() => [
  <Route key="2" path="/list" component={TopicList} exact />,
  <Route key="9" path="/test" component={TestApi} exact />,
  <Route key="3" path="/detail" component={TopicDetail} exact />,
  <Route key="1" path="/" />,
]

// <Route key="1" path="/" render={() => <Redirect to="/test" />} />

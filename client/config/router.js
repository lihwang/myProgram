import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api.test'

export default() => [
  <Route key="1" path="/" exact render={() => <Redirect to="/list" />} />,
  <Route key="2" path="/list" component={TopicList} />,
  <Route key="9" path="/test" component={TestApi} />,
  <Route key="3" path="/detail" component={TopicDetail} />,
]

// <Route key="1" path="/" render={() => <Redirect to="/test" />} />


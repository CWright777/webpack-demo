import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import Dashboard from './containers/Dashboard'
import configureStore from './store/configureStore';

import App from './containers/App';


const store = configureStore();

const routes = (
 <Route path="/" component={App} >
   <IndexRoute component={Dashboard}/>
 </Route>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

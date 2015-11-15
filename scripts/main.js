import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Router, Route } from 'react-router';

	/* 
		ES6 Import Components
	*/
	import StorePicker from './components/StorePicker';
	import App from './components/App';
	import NotFound from './components/NotFound';

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
	<Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Search from './components/Search'
import Insta from './components/Insta'


export default props => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true} component={Login} />
			<Route path="/login" component={Login} />
			<Route path="/search" component={Search} />
			<Route path="/insta" component={Insta} />

		</Switch>
	</BrowserRouter>
)
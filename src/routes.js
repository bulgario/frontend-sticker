import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Search from './components/Search'
import Insta from './components/Insta'

import User from "./services/User";

import {
    ROUTES,
  } from './consts'
  export default props => (
	<Switch>
	  <Route exact path={ROUTES.LOGIN} component={Login} />
	  <PrivateRoutes props={props} />
	</Switch>
  );

function PrivateRoutes(props) {
	const location = props.location;
	if (User.isAuthenticated()) {
	  const user = new User();
	  if (!user.canAcessThisRoute(location.pathname)) {
		return (
		  <Redirect
			to={{
			  pathname: user.getUserInitialRoute(),
			  state: { from: location }
			}}
		  />
		);
	  }
	  return (
		<>
		  <Switch>
		  <Route path="/" exact={true} component={Login} />
			<Route path={ROUTES.LOGIN} component={Login} />
			<Route path={ROUTES.SEARCH} component={Search} />
			<Route path={ROUTES.INSTA} component={Insta} />
  
		  </Switch>
		</>
	  );
	}
	return (
	  <Redirect
		to={{
		  pathname: ROUTES.LOGIN,
		  state: { from: location }
		}}
	  />
	);
  }
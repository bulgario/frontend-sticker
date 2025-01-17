import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Search from './pages/Search'
import Insta from './pages/Insta'
import Home from './pages/Home'
import Produto from './pages/Produto'
import MyReports from './pages/MyReports'
import Relatorio from './pages/Relatorio'
import Produtos from './pages/AllProducts'
import Colecoes from './pages/Collections'
import Colecao from './pages/choosedCollection'

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
			<Route path={ROUTES.HOME} component={Home} />
			<Route path={ROUTES.SEARCH} component={Search} />
			<Route path={ROUTES.INSTA} component={Insta} />
			<Route path={ROUTES.SELECTEDPRODUCT} component={Produto} />
			<Route path={ROUTES.MYREPORTS} component={MyReports} />
			<Route path={ROUTES.RELATORIO} component={Relatorio} />
			<Route path={ROUTES.PRODUTOS} component={Produtos} />
			<Route path={ROUTES.COLECOES} component={Colecoes} />
			<Route path={ROUTES.COLECAO} component={Colecao} />
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
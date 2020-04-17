import '../src/config/ReactotronConfig'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider, createMuiTheme,responsiveFontSizes } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import store, { history } from '../src/store/store'
// import yellow from '@material-ui/core/colors/yellow'
import amber from '@material-ui/core/colors/amber'


let theme = createMuiTheme({
	palette: {
		primary: amber
	},
	secondary: {
		main:amber
	}
})

theme = responsiveFontSizes(theme);
const target = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</ConnectedRouter>
		</Provider>,
	target)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service w   orkers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
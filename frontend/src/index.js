import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store/index';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import HelpeeForm from './js/components/HelpeeForm';
import HelperForm from './js/components/HelperForm';
import HelperSuccess from './js/components/SuccessHelper.jsx';
import HelpeeSuccess from './js/components/SuccessHelpee.jsx';
import Home from './js/components/Home';
import Login from './js/components/Login';
import SignUp from './js/components/SignUp';
import * as serviceWorker from './serviceWorker';
import Chat from './js/components/Chat';

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<div>
					<Route exact path='/' component={Home} />
					<Route path='/helpeeForm' component={HelpeeForm} />
					<Route path='/helperForm' component={HelperForm} />
					<Route path='/helpeeSuccess' component={HelpeeSuccess} />
					<Route path='/helperSuccess' component={HelperSuccess} />
					<Route path='/login' component={Login} />
					<Route path='/signUp' component={SignUp} />
					<Route path= '/chat' component={Chat} />
				</div>
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

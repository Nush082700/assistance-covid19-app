import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const preloadedState = {
	user: null,
	allRequests: [],
	currentRequests: [],
	inSearch: false,
	error: '',
	loading: false,
};

const store = createStore(
	rootReducer,
	preloadedState,
	storeEnhancers(applyMiddleware(thunk))
);

console.log(store.getState());

export default store;

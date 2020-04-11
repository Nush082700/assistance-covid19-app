import * as types from '../constants/actionTypes';
const initailState = {
	user: null,
	allRequests: [],
	currentRequests: [],
	inSearch: false,
	error: '',
	loading: false,
	redirect: '',
	latitude: null,
	longitude: null,
	name: null,
};

const errorReducer = (state = initailState, action) => {
	return { ...state, ...action.payload, redirect: '' };
};

const loadingReducer = (state = initailState, action) => {
	return { ...state, loading: true, redirect: '' };
};

const loginReducer = (state = initailState, action) => {
	return {
		...state,
		...action.payload,
		loading: false,
		error: '',
		redirect: '/',
	};
};

const signUpReducer = (state = initailState, action) => {
	return { ...state, redirect: '/login' };
};
const routingFinishedReducer = (state = initailState, action) => {
	return { ...state, redirect: '' };
};

const logoutReducer = (state = initailState, action) => {
	return {
		...state,
		user: null,
		latitude: null,
		longitude: null,
		name: null,
	};
};

const getRequestsReducer = (state = initailState, action) => {
	return {
		...state,
		allRequests: action.payload.requests,
		currentRequests: action.payload.requests,
	};
};

const rootReducer = (state, action) => {
	switch (action.type) {
		case types.SIGN_UP_STARTED:
		case types.LOGIN_STARTED:
		case types.LOGOUT_STARTED:
		case types.GET_REQUESTS_STARTED:
			return loadingReducer(state, action);
			break;
		case types.LOGIN_SUCCESS:
			return loginReducer(state, action);
			break;
		case types.SIGN_UP_SUCCESS:
			return signUpReducer(state, action);
			break;
		case types.LOGOUT_SUCCESS:
			return logoutReducer(state, action);
		case types.GET_REQUESTS_SUCCESS:
			return getRequestsReducer(state, action);
		case types.SIGN_UP_FAILED:
		case types.LOGIN_FAILED:
		case types.LOGOUT_FAILED:
		case types.GET_REQUESTS_FAILED:
			return errorReducer(state, action);
			break;
		case types.ROUTING_FINISHED:
			return routingFinishedReducer(state, action);
			break;
	}
};

export default rootReducer;

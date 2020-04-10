import * as types from '../constants/actionTypes';

const initailState = {
	user: null,
	allRequests: [],
	currentRequests: [],
	inSearch: false,
	error: '',
	loading: false,
	redirect: '',
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

const rootReducer = (state, action) => {
	switch (action.type) {
		case types.SIGN_UP_STARTED:
		case types.LOGIN_STARTED:
			return loadingReducer(state, action);
			break;
		case types.LOGIN_SUCCESS:
			return loginReducer(state, action);
			break;
		case types.SIGN_UP_SUCCESS:
			return signUpReducer(state, action);
			break;
		case types.SIGN_UP_FAILED:
		case types.LOGIN_FAILED:
			return errorReducer(state, action);
			break;
	}
};

export default rootReducer;

import * as types from '../constants/actionTypes';

export const loginStarted = () => ({
	type: types.LOGIN_STARTED,
});

export const loginSuccess = (data) => ({
	type: types.LOGIN_SUCCESS,
	payload: { ...data },
});

export const loginFailed = (data) => ({
	type: types.LOGIN_FAILED,
	payload: {
		...data,
	},
});

export const signUpStarted = () => ({
	type: types.SIGN_UP_STARTED,
});

export const signUpSuccess = (data) => ({
	type: types.SIGN_UP_SUCCESS,
	payload: { ...data },
});

export const signUpFailed = (data) => ({
	type: types.SIGN_UP_FAILED,
	payload: {
		...data,
	},
});

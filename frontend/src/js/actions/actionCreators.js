import axios from 'axios';
import store from '../store/index';
import * as types from '../constants/actionTypes';
import * as actions from './actions';
const base =
	process.env.REACT_APP_ENV == 'dev' ? 'http://localhost:5000/api' : '/api';

export const login = (bodyFormData) => {
	return (dispatch) => {
		dispatch(actions.loginStarted());
		axios({
			method: 'post',
			baseURL: base,
			url: '/login',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then((res) => {
				console.log(res.data);
				dispatch(actions.loginSuccess(res.data));
			})
			.catch((res) => {
				console.log(res.response ? res.response.data || res : res);
				dispatch(
					actions.loginFailed(
						res.response ? res.response.data || res : res
					)
				);
			});
	};
};

export const signUp = (bodyFormData) => {
	return (dispatch) => {
		dispatch(actions.signUpStarted());
		axios({
			method: 'post',
			baseURL: base,
			url: '/signup',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then((res) => {
				console.log(res.data);
				dispatch(actions.signUpSuccess(res.data));
			})
			.catch((res) => {
				console.log(res);
				dispatch(actions.signUpFailed(res.response.data));
			});
	};
};

export const routingFinished = () => {
	return (dispatch) => {
		dispatch(actions.routingFinished());
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch(actions.logoutStarted());
		axios({
			method: 'post',
			baseURL: base,
			url: '/logout',
		})
			.then((res) => {
				console.log(res.data);
				dispatch(actions.logoutSuccess(res.data));
			})
			.catch((res) => {
				console.log(res);
				dispatch(actions.logoutFailed(res.response.data));
			});
	};
};

export const getRequests = (userId) => {
	return (dispatch) => {
		dispatch(actions.getRequestsStarted());
		axios({
			method: 'get',
			baseURL: base,
			url: userId == null ? '/requests/all' : `/requests/${userId}`,
		})
			.then((res) => {
				dispatch(actions.getRequestsSuccess(res.data));
			})
			.catch((res) => {
				console.log(res);
				dispatch(actions.getRequestsFailed(res));
			});
	};
};

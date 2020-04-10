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
				dispatch(actions.loginSuccess(res.data));
			})
			.catch((res) => {
				dispatch(actions.loginFailed(res.data));
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
				dispatch(actions.signUpSuccess(res.data));
			})
			.catch((res) => {
				console.log(res);
				dispatch(actions.signUpFailed(res));
			});
	};
};

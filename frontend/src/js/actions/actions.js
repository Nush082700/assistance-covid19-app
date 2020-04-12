import * as types from "../constants/actionTypes";

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

export const routingFinished = () => ({
  type: types.ROUTING_FINISHED,
});

export const logoutStarted = () => ({
  type: types.LOGOUT_STARTED,
});

export const logoutSuccess = (data) => ({
  type: types.LOGOUT_SUCCESS,
});

export const logoutFailed = (data) => ({
  type: types.LOGOUT_FAILED,
  payload: {
    ...data,
  },
});

export const getRequestsStarted = () => ({
  type: types.GET_REQUESTS_STARTED,
});

export const getRequestsSuccess = (data) => ({
  type: types.GET_REQUESTS_SUCCESS,
  payload: {
    ...data,
  },
});

export const getRequestsFailed = (data) => ({
  type: types.GET_REQUESTS_FAILED,
  payload: {
    error: "this is an error",
  },
});

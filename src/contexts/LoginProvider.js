import React, { createContext, useReducer } from 'react';

export const loginContext = createContext();
const initialState = {
	isLogin: false,
	role: 2,
	user: {},
};
const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'RELOGIN_SUCCESS':
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', payload.token);
			return {
				isLogin: true,
				user: payload,
				role: payload.role,
			};
		case 'RELOGIN_FAILED':
		case 'LOGOUT':
		case 'LOGIN_FAILED':
			localStorage.removeItem('token');
			return {
				isLogin: false,
				user: payload,
				role: null,
			};
		default:
	}
};
function LoginProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <loginContext.Provider value={[state, dispatch]}>{props.children}</loginContext.Provider>;
}
export default LoginProvider;

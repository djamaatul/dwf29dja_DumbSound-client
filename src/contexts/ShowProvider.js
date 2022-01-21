import React, { useReducer, createContext } from 'react';

export const showContext = createContext();
const initialState = {
	signin: false,
	register: false,
	dropdown: false,
	approvemodal: false,
	alertmodal: false,
	loading: false,
	approve: false,
};
const reducer = (state, action) => {
	switch (action) {
		case 'signin':
			return {
				signin: !state.signin,
			};
		case 'register':
			return {
				register: !state.register,
			};
		case 'dropdown':
			return {
				dropdown: !state.dropdown,
			};
		case 'approve':
			return {
				approvemodal: !state.approvemodal,
			};
		case 'alert':
			return {
				alertmodal: !state.alertmodal,
			};
		case 'loading':
			return {
				loading: !state.loading,
			};
		case 'approve':
			return {
				approve: !state.approve,
			};
		default:
	}
};
export default function ShowProvider({ children }) {
	const [show, setShow] = useReducer(reducer, initialState);
	return <showContext.Provider value={{ show, setShow }}>{children}</showContext.Provider>;
}

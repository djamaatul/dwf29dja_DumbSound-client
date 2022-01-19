import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { loginContext } from './contexts/LoginProvider';
import { API, setAuthToken } from './config/api';

const App = () => {
	const [state, dispatch] = useContext(loginContext);
	useEffect(async () => {
		if (localStorage.token) {
			try {
				setAuthToken(localStorage.token);
				const response = await API.get('/check-auth');
				if (response.status === 401) {
					localStorage.removeItem('token');
					return dispatch({
						type: 'RELOGIN_FAILED',
					});
				}
				localStorage.removeItem('token');
				dispatch({
					type: 'RELOGIN_SUCCESS',
					payload: response.data.data,
				});
			} catch (error) {
				localStorage.removeItem('token');
			}
		} else {
			return dispatch({
				type: 'RELOGIN_FAILED',
			});
		}
	}, []);
	return (
		<>
			<Outlet />
		</>
	);
};

export default App;

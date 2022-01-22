import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { loginContext } from './contexts/LoginProvider';
import { API, setAuthToken } from './config/api';
import nprogress from 'nprogress';

const App = () => {
	const location = useLocation();
	const { dispatch } = useContext(loginContext);

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
	useEffect(() => {
		nprogress.start();
		setTimeout(() => {
			nprogress.done();
		}, 1000);
	}, [location]);
	return (
		<>
			<Outlet />
		</>
	);
};

export default App;

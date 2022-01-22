import React, { useContext, useEffect } from 'react';
import { loginContext } from '../contexts/LoginProvider';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
	const { state } = useContext(loginContext);
	if (state.role !== 1 && state.islogin == true) {
		return <Navigate to='/' />;
	} else {
		return <Outlet />;
	}
}

export default AdminRoute;

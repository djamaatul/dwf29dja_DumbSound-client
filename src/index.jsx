import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.scss';
import './index.css';
import 'react-jinke-music-player/assets/index.css';

import ShowProvider from './contexts/ShowProvider';
import LoginProvider from './contexts/LoginProvider';
import AdminRoute from './components/AdminRoute';

import App from '../src/App';

import { Dashboard, AddMusic, AddArtist, Payment } from '../src/pages';

ReactDOM.render(
	<React.StrictMode>
		<LoginProvider>
			<ShowProvider>
				<Router>
					<Routes>
						<Route path='/' element={<App />}>
							<Route index element={<Dashboard />} />
							<Route path='payment' element={<Payment />} />
							<Route element={<AdminRoute />}>
								<Route path='/addartist' element={<AddArtist />} />
								<Route path='/addmusic' element={<AddMusic />} />
							</Route>
						</Route>
						<Route path='*' element={<div>page 404</div>} />
					</Routes>
				</Router>
			</ShowProvider>
		</LoginProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

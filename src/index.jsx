import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.scss';
import './index.css';
import 'react-jinke-music-player/assets/index.css';
import './nprogress.css';

import ShowProvider from './contexts/ShowProvider';
import LoginProvider from './contexts/LoginProvider';
import AdminRoute from './components/AdminRoute';

import App from '../src/App';

import { Dashboard, AddMusic, AddArtist, Payment, Dashboard_Admin } from '../src/pages';

ReactDOM.render(
	<React.StrictMode>
		<LoginProvider>
			<ShowProvider>
				<Router>
					<Routes>
						<Route path='/' element={<App />}>
							<Route index element={<Dashboard />} />
							<Route path='/payment' element={<Payment />} />
							<Route element={<AdminRoute />}>
								<Route path='/admin' element={<Dashboard_Admin />} />
								<Route path='/addartist' element={<AddArtist />} />
								<Route path='/addmusic' element={<AddMusic />} />
							</Route>
						</Route>
						<Route
							path='*'
							element={
								<div
									className='text-primary d-flex flex-1 justify-content-center align-items-center flex-column'
									style={{ height: '100vh' }}
								>
									<h1>page 404</h1>
									<h3>Halaman tidak ditemukan</h3>
								</div>
							}
						/>
					</Routes>
				</Router>
			</ShowProvider>
		</LoginProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

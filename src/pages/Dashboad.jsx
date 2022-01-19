import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import { API } from '../config/api';

import { loginContext } from '../contexts/LoginProvider';
import Dashboard_Admin from './Dashboard_Admin';

function Dashboad() {
	const [state] = useContext(loginContext);
	const [musics, setMusics] = useState([]);

	async function getMusics() {
		try {
			const response = await API.get('/musics');
			setMusics(response.data.data);
		} catch (error) {
			throw error;
		}
	}
	useEffect(() => {
		getMusics();
	}, []);
	if (state.role === 1) {
		return <Dashboard_Admin />;
	}
	return (
		<>
			<Container fluid='xxl' className='position-relative p-0'>
				<div className='jumbotron'>
					<Navbar />
					<div className='d-flex h-100 align-items-center justify-content-center flex-column'>
						<h1>Connect on DumbSound</h1>
						<p>
							Discovery, Stream, and share a constantly expanding mix of music from emerging and major
							artists around the world
						</p>
					</div>
				</div>
				<Row>
					<Col sm={12} className='d-flex justify-content-center p-3'>
						<h2 className='text-primary'>Dengarkan Dan Rasakan</h2>
					</Col>
				</Row>
				<Row>
					{musics?.map((e, i) => {
						return (
							<Col xs={2} key={i}>
								<Card title={e.title} thumbnail={e.thumbnail} year={e.year} artist={e.artist} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}

export default Dashboad;

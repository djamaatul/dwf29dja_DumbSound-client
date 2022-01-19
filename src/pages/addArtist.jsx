import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import AlertModal from '../components/modals/Alert';

import clip from '../assets/icon/clip.svg';

import { loginContext } from '../contexts/LoginProvider';

import { API, setAuthToken, configJson } from '../config/api';

function AddMusic() {
	const [state, dispatch] = useContext(loginContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');

	const [types, setTypes] = useState([]);
	const [form, setForm] = useState({
		name: '',
		old: '',
		typeid: null,
		startcarrer: '',
	});

	async function getArtist() {
		try {
			const response = await API.get('/type_artists');
			setTypes(response.data.data);
		} catch (error) {
			throw error;
		}
	}

	useEffect(() => {
		if (!state.isLogin) {
			if (localStorage.token) {
				setAuthToken(localStorage.token);
			} else {
				navigate('/');
			}
		} else {
			setAuthToken(localStorage.token);
		}
		getArtist();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('/artist', form, configJson);
			if (response.status === 200) {
				setTimeout(() => {
					setMessage('Success');
					setAlert('success');
				}, 200);
			}
		} catch (error) {
			console.log(error.response);
			return setMessage(error.response.data.message);
		}
	};
	return (
		<>
			<Navbar bg='bg-secondary' />
			<Container fluid='xl' className='text-white'>
				<Row className='mt-5'>
					<Col xs={12}>
						<h3>Add Artist</h3>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-3'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								type='text'
								placeholder='Name'
							/>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-3'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, old: e.target.value })}
								type='text'
								placeholder='Old'
							/>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-4' onChange={(e) => setForm({ ...form, typeid: e.target.value })}>
							<Form.Select style={{ backgroundColor: '#D2D2D240', color: 'white' }}>
								<option>Type</option>
								{types?.map((e, i) => {
									return (
										<option key={e.id} value={e.id}>
											{e.name}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-3'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, startcarrer: e.target.value })}
								type='text'
								placeholder='startcarrer'
							/>
						</Form.Group>
					</Col>
					<Col xs={12} className='d-flex justify-content-center'>
						<Form.Group>
							<Button type='submit' className='px-5 text-white' onClick={handleSubmit}>
								Add Artist
							</Button>
						</Form.Group>
					</Col>
				</Row>
				{alert && (
					<AlertModal
						status={alert === 'success' ? 'success' : 'danger'}
						message={message ? message : 'failed'}
					/>
				)}
			</Container>
		</>
	);
}

export default AddMusic;

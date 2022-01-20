import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import AlertModal from '../components/modals/Alert';

import clip from '../assets/icon/clip.svg';

import { loginContext } from '../contexts/LoginProvider';

import { configMulter, API, setAuthToken } from '../config/api';

function AddMusic() {
	const [state, dispatch] = useContext(loginContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');

	const [artists, setArtists] = useState([]);
	const [form, setForm] = useState({
		title: '',
		year: '',
		artistid: null,
		attachment: '',
		thumbnail: '',
	});

	async function getArtist() {
		try {
			const response = await API.get('/artists');
			if (response.status === 200) {
				setArtists(response.data.data);
				setTimeout(() => {
					setMessage('Success');
					setAlert('success');
				}, 200);
			}
			setArtists(response.data.data);
		} catch (error) {
			throw error;
		}
	}

	useEffect(() => {
		if (!state.isLogin) {
			if (localStorage.token) {
				setAuthToken(localStorage.token);
				state.role === 2 && navigate('/');
			} else {
				navigate('/');
			}
		} else {
			setAuthToken(localStorage.token);
			state.role === 2 && navigate('/');
		}
		getArtist();
	}, []);

	const handleSubmit = async (e) => {
		console.log(form);
		e.preventDefault();
		const formData = new FormData();
		formData.set('title', form.title);
		formData.set('year', form.year);
		formData.set('artistid', form.artistid);
		formData.set('thumbnail', form.thumbnail, form.thumbnail.name);
		formData.set('attachment', form.attachment, form.attachment.name);
		try {
			const response = await API.post('/music', formData, configMulter);
			if (response.status === 200) {
				setTimeout(() => {
					setMessage('Success');
					setAlert('success');
				}, 200);
			}
		} catch (error) {
			setMessage(error.response.data.message);
			return setAlert('danger');
		}
	};
	return (
		<>
			<Navbar className='bg-secondary shadow-sm' />
			<Container fluid='xl' className='text-white'>
				<Row className='mt-5'>
					<Col xs={12}>
						<h3>Add Music</h3>
					</Col>
					<Col md={8} xs={12}>
						<Form.Group className='my-3'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, title: e.target.value })}
								type='text'
								placeholder='Title'
							/>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group className='my-3 position-relative'>
							<Button
								variant='light'
								className=' d-flex w-100 justify-content-between'
								style={{
									backgroundColor: '#D2D2D240',
									color: 'grey',
									border: '1px solid white',
								}}
							>
								Attach thumbnail <img src={clip} width={15} alt='' />
							</Button>
							<Form.Control
								className='position-absolute top-0 w-100'
								style={{ opacity: '0%' }}
								type='file'
								onChange={(e) => {
									if (e.target.files[0].type.match(/^image\/.*/)) {
										setForm({ ...form, thumbnail: e.target.files[0] });
									} else {
										document.getElementById('preview').removeAttribute('src');
										e.target.files = null;
									}
								}}
							/>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-3'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, year: e.target.value })}
								type='text'
								placeholder='Year'
							/>
						</Form.Group>
					</Col>
					<Col xs={12}>
						<Form.Group className='my-4' onChange={(e) => setForm({ ...form, artistid: e.target.value })}>
							<Form.Select style={{ backgroundColor: '#D2D2D240', color: 'white' }}>
								<option>Artist</option>
								{artists?.map((e, i) => {
									return (
										<option key={e.id} value={e.id}>
											{e.name}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group className='my-3 position-relative'>
							<Button
								variant='light'
								className=' d-flex justify-content-between'
								style={{
									backgroundColor: '#D2D2D240',
									color: 'grey',
									border: '1px solid white',
								}}
							>
								Attach
							</Button>
							<Form.Control
								className='position-absolute top-0'
								style={{ opacity: '0%', width: 75 }}
								type='file'
								onChange={(e) => {
									if (e.target.files[0].type.match(/^audio\/.*/)) {
										setForm({ ...form, attachment: e.target.files[0] });
									} else {
										document.getElementById('preview').removeAttribute('src');
										e.target.files = null;
									}
								}}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} className='d-flex justify-content-center'>
						<Form.Group>
							<Button type='submit' className='px-5 text-white' onClick={handleSubmit}>
								Add Song
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

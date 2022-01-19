import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import AlertModal from '../components/modals/Alert';

import clip from '../assets/icon/clip.svg';

import { loginContext } from '../contexts/LoginProvider';

import { configMulter, API, setAuthToken } from '../config/api';

function Payment() {
	const [state, dispatch] = useContext(loginContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		accountnumber: '',
		attachment: '',
	});

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
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('accountnumber', form.accountnumber);
		formData.set('attachment', form.attachment, form.attachment.name);
		try {
			const response = await API.post('/transaction', formData, configMulter);
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
			<Navbar className='bg-transparent' />
			<Container fluid='xxl' className='text-white'>
				<Row>
					<Col xs={12} className='d-flex justify-content-center mt-5 pt-5 '>
						<h2 className='fw-bold'>Premium</h2>
					</Col>
					<Col xs={12} className='d-flex justify-content-center my-3'>
						<h5>
							Bayar sekarang dan nikmati streaming music yang kekinian dari
							<span className='text-primary'> DUMB</span>
							<span className='text-white'>SOUND</span>
						</h5>
					</Col>
					<Col xs={12} className='d-flex justify-content-center my-3'>
						<h4 className='ms-3 fw-bold'>
							<span className='text-primary'>DUMB</span>
							<span className='text-white'>SOUND : </span>
							0981312323
						</h4>
					</Col>
					<Col xs={12} className='d-flex justify-content-center '>
						<Form className='p-2'>
							<Form.Group className='my-4' controlId='formBasicEmail'>
								<Form.Control
									style={{ backgroundColor: '#D2D2D240', color: 'white' }}
									onChange={(e) => setForm({ ...form, accountnumber: e.target.value })}
									type='text'
									placeholder='input your account number'
								/>
							</Form.Group>
							<Form.Group className='mb-3 position-relative'>
								<Button
									className='w-100 text-primary  d-flex  justify-content-between bg-transparent'
									style={{ color: 'white', border: '2px solid white' }}
								>
									Attache proof of transfer <img src={clip} alt='' />
								</Button>
								<Form.Control
									className='position-absolute top-0 w-100 '
									style={{ opacity: '0%' }}
									type='file'
									onChange={(e) => {
										if (e.target.files[0].type.match(/^image\/.*/)) {
											setForm({ ...form, attachment: e.target.files[0] });
										} else {
											document.getElementById('preview').removeAttribute('src');
											e.target.files = null;
										}
									}}
								/>
							</Form.Group>
							<Form.Group className='w-100'>
								<Button type='submit' className='w-100 text-white' onClick={handleSubmit}>
									Send
								</Button>
							</Form.Group>
						</Form>
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

export default Payment;

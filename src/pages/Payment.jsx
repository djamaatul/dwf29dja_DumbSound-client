import React, { useState, useContext, useEffect } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import nprogress from 'nprogress';

import Navbar from '../components/Navbar';
import AlertModal from '../components/modals/Alert';
import LoadingScreen from '../components/LoadingScreen';

import clip from '../assets/icon/clip.svg';

import { loginContext } from '../contexts/LoginProvider';
import { showContext } from '../contexts/ShowProvider';
import { configMulter, API, setAuthToken } from '../config/api';

function Payment() {
	document.title = 'Payment | DumbSound';
	const { show, setShow } = useContext(showContext);
	const { state, dispatch } = useContext(loginContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		accountnumber: '',
		attachment: '',
	});

	useEffect(() => {
		if (!state.isLogin) {
			if (!localStorage.token) {
				navigate('/');
			}
		} else {
			setAuthToken(localStorage.token);
		}
		nprogress.done();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setShow('loading');
		const formData = new FormData();
		formData.set('accountnumber', form.accountnumber);
		formData.set('attachment', form.attachment, form.attachment.name);
		try {
			const response = await API.post('/transaction', formData, configMulter);
			if (response.status === 200) {
				setTimeout(() => {
					setShow('loading');
					setMessage('Success');
					setAlert('success');
				}, 300);
			}
		} catch (error) {
			setMessage(error.response.data.message);
			return setAlert('danger');
		}
	};
	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
				{show.loading && <LoadingScreen />}
				<Navbar className='bg-transparent' />
				<Container fluid='xxl' className='text-white'>
					{state.subscribe !== true && state.ispending !== true ? (
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
					) : state.subscribe !== true && state.ispending === true ? (
						<Row>
							<Col
								xs={12}
								className='d-flex flex-column justify-content-center align-items-center'
								style={{ height: '80vh' }}
							>
								<h1 className='text-primary'>Terimakasih,</h1>
								<h1>Transaksi sedang di proses :)</h1>
							</Col>
						</Row>
					) : (
						<Row>
							<Col
								xs={12}
								className='d-flex flex-column justify-content-center align-items-center'
								style={{ height: '80vh' }}
							>
								<h1>Terimakasih Anda sedang berlangganan</h1>
								<h3 className='text-primary'>Akun anda telah aktif</h3>
							</Col>
						</Row>
					)}
				</Container>
			</motion.div>
			{alert && (
				<AlertModal
					status={alert === 'success' ? 'success' : 'danger'}
					message={message ? message : 'failed'}
				/>
			)}
		</>
	);
}

export default Payment;

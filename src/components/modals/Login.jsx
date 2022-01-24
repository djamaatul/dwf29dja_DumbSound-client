import nprogress from 'nprogress';
import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { API, configJson } from '../../config/api';

import { loginContext } from '../../contexts/LoginProvider';
import { showContext } from '../../contexts/ShowProvider';

import Register from './Register';

function Login(props) {
	const navigate = useNavigate();
	const { show, setShow } = useContext(showContext);
	const { state, dispatch } = useContext(loginContext);

	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		nprogress.start();
		try {
			e.preventDefault();
			const response = await API.post('/login', JSON.stringify(form), configJson);
			if (response.status === 200) {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: response.data.data,
				});
				setShow('signin');
				if (response.data.data.role == 1) {
					navigate('/admin');
				}
				nprogress.done();
			}
		} catch (error) {
			console.log(error.response);
			return setMessage(error.response.data.message);
		}
	};

	useEffect(() => {
		return () => {
			setMessage('');
		};
	}, [show]);

	return (
		<>
			<Modal
				show={props.show}
				onHide={props.hide}
				contentClassName='w-50 bg-transparent'
				dialogClassName='d-flex justify-content-center mt-5 '
			>
				<Modal.Body className='bg-secondary rounded-3'>
					<Form>
						<h1 className='text-white'>Login</h1>
						<Form.Group className='my-4' controlId='formBasicEmail'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								type='email'
								placeholder='Enter email'
							/>
						</Form.Group>
						<Form.Group className='my-4' controlId='formBasicPassword'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								type='password'
								placeholder='Password'
							/>
						</Form.Group>
						<div className='d-grid gap-2'>
							<Button className='full text-white' variant='primary' onClick={handleSubmit}>
								Login
							</Button>
							<Form.Group className='my-1 mx-auto'>
								{message && <Alert variant='danger'>{message}</Alert>}
							</Form.Group>

							<Form.Text className='text-center text-gray'>
								Don't have an account ? Klik{' '}
								<Link
									onClick={() => {
										setShow('signin');
										setShow('register');
									}}
									className='text-white text-decoration-none'
									to='/'
								>
									Here
								</Link>
							</Form.Text>
						</div>
					</Form>
				</Modal.Body>
				<Register show={show.register} hide={() => setShow('register')} />
			</Modal>
		</>
	);
}

export default Login;

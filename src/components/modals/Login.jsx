import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { API, configJson } from '../../config/api';

import { loginContext } from '../../contexts/LoginProvider';
import { showContext } from '../../contexts/ShowProvider';

import Register from './Register';
import AlertModal from './Alert';

function Login(props) {
	const [show, setShow] = useContext(showContext);
	const [state, dispatch] = useContext(loginContext);

	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const response = await API.post('/login', JSON.stringify(form), configJson);
			if (response.status === 200) {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: response.data.data,
				});
				setShow('signin');
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

	useEffect(() => {
		return () => {
			setMessage('');
		};
	}, [show]);

	return (
		<>
			<Modal show={props.show} onHide={props.hide} className='w-20' dialogClassName='modal-width'>
				<Modal.Body className='bg-secondary'>
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
							<Form.Group className='my-4 mx-auto'>
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
			{alert && (
				<AlertModal
					status={alert === 'success' ? 'success' : 'danger'}
					message={message ? message : 'failed'}
				/>
			)}
		</>
	);
}

export default Login;

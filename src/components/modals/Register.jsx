import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { showContext } from '../../contexts/ShowProvider';

import Login from './Login';
import AlertModal from './Alert';

import { configJson, API } from '../../config/api';

function Register(props) {
	const { show, setShow } = useContext(showContext);
	const [message, setMessage] = useState(null);
	const [alert, setAlert] = useState('');
	const [form, setForm] = useState({
		email: '',
		password: '',
		fullname: '',
		phone: '',
		genderid: null,
		address: '',
	});
	useEffect(() => {
		return () => {
			setMessage('');
		};
	}, [show]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('register', JSON.stringify(form), configJson);
			if (response.status == 200) {
				setShow('register');
				setMessage('success');
				return setAlert('success');
			}
		} catch (error) {
			setMessage(<Alert variant='danger'>{error.response.data.message}</Alert>);
		}
	};
	return (
		<>
			<Modal
				aria-labelledby='contained-modal-title-vcenter'
				contentClassName=' bg-transparent align-items-center'
				dialogClassName='d-flex justify-content-center  mt-5'
				onHide={props.hide}
				show={props.show}
			>
				<Modal.Body className='bg-secondary rounded-3 '>
					<Form onSubmit={handleSubmit}>
						<h1 className='text-white'>Register</h1>
						<Form.Group className='my-4' controlId='formBasicEmail'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								type='email'
								placeholder='Enter email'
								onChange={(e) => setForm({ ...form, email: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className='my-4' controlId='formBasicPassword'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								type='password'
								placeholder='Password'
								onChange={(e) => setForm({ ...form, password: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className='my-4'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								type='text'
								placeholder='Full name'
								onChange={(e) => setForm({ ...form, fullname: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className='my-4' onChange={(e) => setForm({ ...form, genderid: e.target.value })}>
							<Form.Select style={{ backgroundColor: '#D2D2D240', color: 'white' }}>
								<option>Gender</option>
								<option value={1}>Male</option>
								<option value={2}>Female</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className='my-4'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								type='text'
								placeholder='Phone'
								onChange={(e) => setForm({ ...form, phone: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className='my-4'>
							<Form.Control
								style={{ backgroundColor: '#D2D2D240', color: 'white' }}
								type='text'
								placeholder='address'
								onChange={(e) => setForm({ ...form, address: e.target.value })}
							/>
						</Form.Group>
						<div className='d-grid gap-2'>
							<Button className='full' variant='primary' type='submit'>
								Register
							</Button>
							<Form.Group className='my-1 mx-auto'>
								{message && <Alert variant='danger'>{message}</Alert>}
							</Form.Group>
							<Form.Text className='text-center'>
								Already have an account ? Klik{' '}
								<Link
									onClick={() => {
										setShow('register');
										setShow('signin');
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
				<Login show={show.signin} hide={() => setShow('signin')} />
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

export default Register;

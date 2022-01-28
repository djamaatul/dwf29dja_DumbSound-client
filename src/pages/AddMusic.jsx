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
import MusicList from '../components/MusicList';

function AddMusic() {
	document.title = 'AddMusic | DumbSound';

	const { state } = useContext(loginContext);
	const { show, setShow } = useContext(showContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');
	const [music, setMusic] = useState([]);

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
				nprogress.done();
			}
		} catch (error) {
			throw error;
		}
	}
	async function getMusics() {
		try {
			const response = await API.get('/musics');
			setMusic(response.data.data);
		} catch (error) {
			throw error;
		}
	}
	useEffect(() => {
		if (!state.isLogin) {
			if (!localStorage.token && state.role !== 1) {
				navigate('/');
			}
			getArtist();
			getMusics();
		} else {
			setAuthToken(localStorage.token);
			getArtist();
			getMusics();
		}
	}, []);

	const handleSubmit = async (e) => {
		setShow('loading');
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
					setShow('loading');
					setMessage('Success');
					setAlert('success');
				}, 300);
				getMusics();
			}
		} catch (error) {
			setMessage(error.response.data.message);
			return setAlert('danger');
		}
	};
	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
				{show.loading == true && <LoadingScreen />}
				<Navbar className='bg-secondary shadow-sm' />
				<Container fluid='xl' className='text-white px-4 px-0'>
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
							<Form.Group
								className='my-4'
								onChange={(e) => setForm({ ...form, artistid: e.target.value })}
							>
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
					<hr />
					<Row className='my-5'>
						<Col xs={12}>
							<div>
								{music?.map((e) => {
									return (
										<MusicList
											update={getMusics}
											key={e.id}
											id={e.id}
											thumbnail={e.thumbnail}
											title={e.title}
											artist={e.artist.name}
										/>
									);
								})}
							</div>
						</Col>
					</Row>
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

export default AddMusic;

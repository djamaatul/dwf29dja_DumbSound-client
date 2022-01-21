import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import { API } from '../config/api';

import { loginContext } from '../contexts/LoginProvider';
import { showContext } from '../contexts/ShowProvider';
import Dashboard_Admin from './Dashboard_Admin';

function Dashboad() {
	document.title = 'Dashboard | DumbSound';

	const { state } = useContext(loginContext);
	const { show, setShow } = useContext(showContext);
	const [music, setMusic] = useState([]);
	const [audioLists, setAudioLists] = useState([]);
	const navigate = useNavigate();
	let [audioInstance, SetAudioInstance] = useState(() => {});

	async function getMusics() {
		try {
			const response = await API.get('/musics');
			setMusic(response.data.data);
			setAudioLists(
				...audioLists,
				response.data.data.map((e) => {
					return {
						cover: e.thumbnail,
						year: e.year,
						musicSrc: e.attachment,
						singer: e.artist.name,
						name: e.title,
					};
				})
			);
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
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<Container fluid='xxl' className='position-relative p-0 pb-5'>
				{state.isLogin == true && state.subscribe == true && (
					<ReactJkMusicPlayer
						audioLists={state.subscribe == true ? audioLists : []}
						autoPlay={false}
						remove={false}
						showDownload={false}
						defaultVolume={0.5}
						showThemeSwitch={false}
						showReload={false}
						showDestroy={false}
						showPlayMode={false}
						responsive={true}
						showMiniModeCover={false}
						getAudioInstance={(instance) => {
							SetAudioInstance(instance);
						}}
					/>
				)}
				<div className='jumbotron '>
					<Navbar />
					<Col xs={12} className='d-flex h-100 align-items-center justify-content-center flex-column px-5'>
						<h1>Connect on DumbSound</h1>
						<p className='text-center'>
							Discovery, Stream, and share a constantly expanding mix of music from emerging and major
							artists around the world
						</p>
					</Col>
				</div>
				<Row className='m-0'>
					<Col xs={12} className='d-flex justify-content-center my-5'>
						{state.isLogin ? (
							<Link to={state.subscribe == false ? '/payment' : ''} className='text-decoration-none'>
								<h2 className='text-primary'>Dengarkan Dan Rasakan</h2>
							</Link>
						) : (
							<h2
								onClick={() => setShow('signin')}
								className='text-primary'
								style={{ cursor: 'pointer' }}
							>
								Dengarkan Dan Rasakan
							</h2>
						)}
					</Col>
					{music?.map((e, i) => {
						return (
							<Col xs={6} sm={4} md={3} lg={2} key={i}>
								<motion.div
									whileHover={{ scale: 1.1 }}
									style={{ cursor: 'pointer', borderRadius: 20 }}
									onClick={() => {
										state.subscribe == true
											? audioInstance.playByIndex(i)
											: state.isLogin == true
											? navigate('/payment')
											: setShow('signin');
									}}
								>
									<Card
										title={e.title}
										thumbnail={e.thumbnail}
										year={e.year}
										artist={e.artist.name}
										autoPlay={false}
									/>
								</motion.div>
							</Col>
						);
					})}
				</Row>
			</Container>
		</motion.div>
	);
}

export default Dashboad;

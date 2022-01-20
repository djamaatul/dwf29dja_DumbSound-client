import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import { API } from '../config/api';

import { loginContext } from '../contexts/LoginProvider';
import { showContext } from '../contexts/ShowProvider';
import Dashboard_Admin from './Dashboard_Admin';

function Dashboad() {
	const [state] = useContext(loginContext);
	const [show, setShow] = useContext(showContext);
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
		<Container fluid='xxl' className='position-relative p-0'>
			<ReactJkMusicPlayer
				audioLists={state.subscribe == true ? audioLists : []}
				showDownload={false}
				defaultVolume={0.5}
				showThemeSwitch={false}
				showReload={false}
				showDestroy={false}
				showPlayMode={false}
				showMiniModeCover={false}
				getAudioInstance={(instance) => {
					SetAudioInstance(instance);
				}}
			/>
			<div className='jumbotron '>
				<Navbar />
				<div className='d-flex h-100 align-items-center justify-content-center flex-column'>
					<h1>Connect on DumbSound</h1>
					<p>
						Discovery, Stream, and share a constantly expanding mix of music from emerging and major artists
						around the world
					</p>
				</div>
			</div>
			<Row className='m-0'>
				<Col xs={12} className='d-flex justify-content-center my-5'>
					{state.isLogin ? (
						<Link to='/payment'>
							<h2 className='text-primary'>Dengarkan Dan Rasakan</h2>
						</Link>
					) : (
						<h3 onClick={() => setShow('signin')} className='text-primary' style={{ cursor: 'pointer' }}>
							Dengarkan Dan Rasakan
						</h3>
					)}
				</Col>
				{music?.map((e, i) => {
					return (
						<Col xs={2} key={i}>
							<div
								style={{ cursor: 'pointer', borderRadius: 20 }}
								onClick={() => {
									state.subscribe == true ? audioInstance.playByIndex(i) : navigate('/payment');
								}}
							>
								<Card
									title={e.artist.name}
									thumbnail={e.thumbnail}
									year={e.year}
									artist={e.artist.name}
									autoPlay={false}
								/>
							</div>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default Dashboad;

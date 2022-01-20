import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './styles.css';

import invoices from '../assets/icon/invoices.svg';
import logout from '../assets/icon/logout.svg';
import music from '../assets/icon/music.svg';
import artist from '../assets/icon/artist.svg';

import { loginContext } from '../contexts/LoginProvider';
import { showContext } from '../contexts/ShowProvider';

function DropDown(props) {
	const { state, dispatch } = useContext(loginContext);
	const { setShow } = useContext(showContext);

	const variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	return (
		<motion.div
			animate={{ scale: props.show ? [0, 1.1, 1] : 0 }}
			transition={{ duration: 0.3 }}
			style={{ display: props.show ? 'inline-block' : 'none' }}
			className='dropdown dp-nav me-md-5 bg-secondary font fw-bold'
		>
			<ul>
				{state.role == 1 ? (
					<div className='ms-3'>
						<motion.li whileHover={{ scale: 1.1 }}>
							<Link to='/addmusic' onClick={() => setShow('dropdown')}>
								<img width='30px' height='30px' alt='' src={music} /> Add Music
							</Link>
						</motion.li>
						<motion.li whileHover={{ scale: 1.1 }}>
							<Link to='/addartist' onClick={() => setShow('dropdown')}>
								<img width='33px' height='33px' alt='' src={artist} className='' /> Add Artist
							</Link>
						</motion.li>
					</div>
				) : (
					<div className='ms-3'>
						<motion.li whileHover={{ scale: 1.1 }}>
							<Link to='/payment' onClick={() => setShow('dropdown')}>
								<img src={invoices} width='30px' height='30px' alt='' /> Pay
							</Link>
						</motion.li>
					</div>
				)}
			</ul>
			<hr />
			<ul>
				<div className='ms-3'>
					<motion.li whileHover={{ scale: 1.1 }}>
						<a
							href='/'
							onClick={() => {
								localStorage.removeItem('token');
								dispatch({
									type: 'LOGOUT',
									payload: null,
								});
							}}
						>
							<img width='30px' height='30px' src={logout} alt='' /> Logout
						</a>
					</motion.li>
				</div>
			</ul>
		</motion.div>
	);
}

export default DropDown;

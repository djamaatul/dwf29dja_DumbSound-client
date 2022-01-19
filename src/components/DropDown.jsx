import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import invoices from '../assets/icon/invoices.svg';
import logout from '../assets/icon/logout.svg';
import music from '../assets/icon/music.svg';
import artist from '../assets/icon/artist.svg';

import { loginContext } from '../contexts/LoginProvider';
import { showContext } from '../contexts/ShowProvider';

function DropDown(props) {
	const [state, dispatch] = useContext(loginContext);
	const [show, setShow] = useContext(showContext);
	return (
		<div
			style={{ display: props.show ? 'inline-block' : 'none' }}
			className='dropdown dp-nav me-md-5 bg-secondary font fw-bold'
		>
			<ul onClick={() => setShow('dropdown')}>
				{state.role == 1 ? (
					<>
						<li>
							<Link to='/addmusic'>
								<img width='30px' height='30px' alt='' src={music} /> Add Music
							</Link>
						</li>
						<li>
							<Link to='/addartist'>
								<img width='30px' height='30px' alt='' src={artist} /> Add Artist
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/payment'>
								<img src={invoices} width='30px' height='30px' alt='' /> Pay
							</Link>
						</li>
					</>
				)}
			</ul>
			<hr />
			<ul onClick={() => setShow('dropdown')}>
				<li>
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
				</li>
			</ul>
		</div>
	);
}

export default DropDown;

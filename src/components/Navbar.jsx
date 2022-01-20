import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import DropDown from './DropDown';
import Login from './modals/Login';
import Register from './modals/Register';

import './styles.css';
import logo from '../assets/icon/logo.svg';
import user from '../assets/some.png';

import { showContext } from '../contexts/ShowProvider';
import { loginContext } from '../contexts/LoginProvider';

function Header(props) {
	const { show, setShow } = useContext(showContext);
	const { state } = useContext(loginContext);

	return (
		<>
			<Login show={show.signin} hide={() => setShow('signin')} />
			<Register show={show.register} hide={() => setShow('register')} />
			<Navbar collapseOnSelect {...props}>
				<Container fluid='xxl'>
					<Navbar.Brand className='ms-md-5'>
						<Link to='/' className='text-decoration-none d-flex align-items-center'>
							<img src={logo} width='30' height='30' className='d-inline-block align-top' alt='Logo' />
							<h4 className='ms-3 p-0 my-0'>
								<span className='text-primary'>DUMB</span>
								<span className='text-white'>SOUND</span>
							</h4>
						</Link>
					</Navbar.Brand>
					<Nav className='ms-auto'></Nav>
					{state.isLogin ? (
						<div className='dpcontain'>
							<motion.img
								whileTap={{ scale: 1.1 }}
								onClick={() => setShow('dropdown')}
								style={{ cursor: 'pointer' }}
								src={user}
								width='50'
								height='50'
								alt='User'
								className='d-inline-block align-top border rounded-circle border-2 border-white me-md-5'
							/>
							<DropDown show={show.dropdown} />
						</div>
					) : (
						<Nav.Link>
							<Button
								onClick={() => setShow('signin')}
								variant='clear'
								className='text-white'
								style={{ border: '1px solid white' }}
							>
								Login
							</Button>
							<Button
								onClick={() => setShow('register')}
								style={{ borderRadius: 10 }}
								className='ms-2 text-white fw-bold'
							>
								Register
							</Button>
						</Nav.Link>
					)}
				</Container>
			</Navbar>
		</>
	);
}

export default Header;

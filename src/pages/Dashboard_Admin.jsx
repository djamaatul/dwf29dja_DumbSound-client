import React, { useEffect, useState, useContext } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import nprogress from 'nprogress';

import Navbar from '../components/Navbar';
import DropDown from '../components/DropDown_Approve';
import PreviewImage from '../components/modals/PreviewImage';
import LoadingScreen from '../components/LoadingScreen';

import triangle from '../assets/icon/triangle.svg';

import { loginContext } from '../contexts/LoginProvider';
import { API, setAuthToken } from '../config/api';
import { showContext } from '../contexts/ShowProvider';

function Dashboard_Admin() {
	document.title = 'Dashboard Admin | DumbSound';

	const { state } = useContext(loginContext);
	const { show } = useContext(showContext);
	const navigate = useNavigate();
	const [transaction, setTransaction] = useState([]);
	const [preview, setPreview] = useState(false);

	const getTransaction = async () => {
		try {
			const response = await API.get('/transactions');
			setTransaction(response.data.data.reverse());
			nprogress.done();
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		if (!state.isLogin) {
			if (localStorage.token) {
				setAuthToken(localStorage.token);
			} else {
				navigate('/');
			}
		} else {
			setAuthToken(localStorage.token);
			state.role === 2 && navigate('/');
		}
		getTransaction();
	}, []);
	const handleUpdate = () => {
		getTransaction();
	};
	const handlePreview = () => {
		setPreview(!preview);
	};
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			{show.loading && <LoadingScreen />}
			<Navbar className='bg-secondary shadow-sm' />
			<Container className='p-5'>
				<Table striped bordered hover variant='dark' responsive='sm'>
					<thead>
						<tr className='text-primary'>
							<th>#</th>
							<th>users</th>
							<th>Bukti Transfer</th>
							<th>Remaining Active</th>
							<th>Status Active</th>
							<th>Status Payment</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{transaction.map((e, i) => {
							return (
								<tr key={i}>
									<td>{i}</td>
									<td style={{ textTransform: 'capitalize' }}>{e.user.fullname}</td>
									<td>
										<a
											className='text-decoration-none text-white '
											href='#'
											onClick={(ex) => {
												ex.preventDefault();
												handlePreview();
											}}
										>
											{e.attachment}
										</a>
										{preview && (
											<PreviewImage
												show={preview}
												toggleShow={() => setPreview(!preview)}
												attachment={e.attachment_link}
											/>
										)}
									</td>
									<td>
										{e.duedate && e.startdate
											? `${Math.round(
													(parseInt(new Date(e.duedate).getTime()) -
														parseInt(new Date().getTime())) /
														(1000 * 60 * 60 * 24)
											  )}/Hari`
											: '0/Hari'}
									</td>
									<td>
										{e.startdate && e.duedate ? (
											<span className='text-success'>Active</span>
										) : (
											<span className='text-primary'>Not active</span>
										)}
									</td>
									{e.status === 'success' ? (
										<td className='text-success'>{e.status}</td>
									) : e.status == 'pending' ? (
										<td className='text-warning'>{e.status}</td>
									) : (
										<td className='text-primary'>{e.status}</td>
									)}
									<td width={10} className='text-center'>
										<div
											className='dpcontain'
											onClick={() => {
												document.getElementById(`dp${e.id}`).classList.toggle('d-block');
											}}
										>
											<img
												style={{ cursor: 'pointer' }}
												src={triangle}
												alt='User'
												className='d-inline-block align-top'
											/>
											<DropDown id={e.id} update={() => handleUpdate()} />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		</motion.div>
	);
}

export default Dashboard_Admin;

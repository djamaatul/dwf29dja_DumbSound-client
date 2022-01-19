import React, { useEffect, useState, useContext } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import DropDown from '../components/DropDown_Approve';

import triangle from '../assets/icon/triangle.svg';

import { loginContext } from '../contexts/LoginProvider';
import { API, setAuthToken } from '../config/api';

function Dashboard_Admin() {
	const [state] = useContext(loginContext);
	const navigate = useNavigate();
	const [transaction, setTransaction] = useState([]);

	const getTransaction = async () => {
		try {
			const response = await API.get('/transactions');
			setTransaction(response.data.data);
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
		}
		getTransaction();
	}, []);
	const handleUpdate = () => {
		getTransaction();
	};
	const handlePreview = (e) => {};
	return (
		<>
			<Navbar className='bg-secondary shadow-sm' />
			<Container className='p-5'>
				<Table striped bordered hover variant='dark'>
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
									<td>{e.user.fullname}</td>
									<td>
										<a
											href='#'
											onClick={(ex) => {
												ex.preventDefault();
												handlePreview(e.attachment_link);
											}}
										>
											{e.attachment}
										</a>
									</td>
									<td>
										{e.duedate && e.startdate
											? `${
													(parseInt(new Date(e.duedate).getTime()) -
														parseInt(new Date(e.startdate).getTime())) /
													(1000 * 60 * 60 * 24)
											  }/Hari`
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
		</>
	);
}

export default Dashboard_Admin;

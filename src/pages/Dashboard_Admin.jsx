import React, { useEffect, useState, useContext } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import DropDown from '../components/DropDown_Approve';

import triangle from '../assets/icon/triangle.svg';

import { loginContext } from '../contexts/LoginProvider';
import { configJson, API, setAuthToken } from '../config/api';

function Dashboard_Admin() {
	const [state, dispatch] = useContext(loginContext);
	const navigate = useNavigate();
	const [transaction, setTransaction] = useState([]);
	async function getTransaction() {
		try {
			const response = await API.get('/transactions');
			console.log(response.data.data);
			setTransaction(response.data.data);
		} catch (error) {
			throw error;
		}
	}
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
	const handlePreview = (e) => {};
	return (
		<>
			<Navbar bg='bg-secondary' />
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
										></a>
										{e.attachment}
									</td>
									<td>{e.duedate && e.startdate ? `${e.duedata - e.startdate}/Hari` : '0/Hari'}</td>
									<td>
										{e.status !== 'pending' ? (
											<span className='text-success'>Active</span>
										) : (
											<span className='text-primary'>Not active</span>
										)}
									</td>
									<td className='text-warning'>{e.status}</td>
									<td width={10} className='text-center'>
										<div
											className=''
											class='dpcontain'
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
											<DropDown id={e.id} />
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

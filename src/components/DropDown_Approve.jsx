import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

import { API } from '../config/api';

import AlertModal from './modals/Alert';

import { showContext } from '../contexts/ShowProvider';

function DropDown(props) {
	const { show, setShow } = useContext(showContext);
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');

	const approve = async () => {
		setShow('loading');
		try {
			const response = await API.patch(`/transaction/${props.id}`, { status: 'success' });
			setTimeout(() => {
				setShow('loading');
				setMessage(response.data.message);
				setAlert('success');
				props.update();
			}, 800);
		} catch (error) {
			setTimeout(() => {
				setMessage(error.response.data.message);
				setAlert('failed');
				props.update();
			}, 200);
		}
	};

	const cancel = async () => {
		try {
			setShow('loading');
			const response = await API.patch(`/transaction/${props.id}`, { status: 'cancel' });
			setTimeout(() => {
				setShow('loading');
				setMessage(response.data.message);
				setAlert('success');
				props.update();
			}, 200);
		} catch (error) {
			setTimeout(() => {
				setMessage(error.response.data.message);
				setAlert('failed');
			}, 200);
		}
	};

	const handleApprove = () => {
		approve();
	};
	const handleCancel = () => {
		cancel();
	};
	useEffect(() => {
		return () => {
			setAlert('');
		};
	}, [show]);
	return (
		<div id={`dp${props.id}`} style={{ display: 'none' }} className='dropdown dp-approve bg-secondary font fw-bold'>
			<ul>
				<motion.li whileHover={{ scale: 1.1 }} className='text-success' onClick={handleApprove}>
					Approve
				</motion.li>
				<motion.li whileHover={{ scale: 1.1 }} className='text-primary' onClick={handleCancel}>
					cancel
				</motion.li>
			</ul>
			{alert && (
				<AlertModal
					status={alert === 'success' ? 'success' : 'danger'}
					message={message ? message : 'failed'}
				/>
			)}
		</div>
	);
}

export default DropDown;

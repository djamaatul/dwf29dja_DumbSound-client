import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

import { API } from '../config/api';

import AlertModal from './modals/Alert';

function DropDown(props) {
	const [alert, setAlert] = useState('');
	const [message, setMessage] = useState('');
	const approve = async () => {
		try {
			const response = await API.patch(`/transaction/${props.id}`, { status: 'success' });
			setTimeout(() => {
				setMessage(response.data.message);
				setAlert('success');
				props.update();
			}, 200);
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
			const response = await API.patch(`/transaction/${props.id}`, { status: 'cancel' });
			setTimeout(() => {
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

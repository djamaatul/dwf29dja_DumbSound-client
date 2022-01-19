import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function DropDown(props) {
	const handleApprove = async () => {};
	return (
		<div id={`dp${props.id}`} style={{ display: 'none' }} className='dropdown dp-approve bg-secondary font fw-bold'>
			<ul>
				<li className='  text-success'>
					<span onClick={handleApprove}>Approve</span>
				</li>
				<li className='text-primary'>
					<span
						onClick={() => {
							document.getElementById(`dp${props.id}`).classList.toggle('d-block');
						}}
					>
						cancel
					</span>
				</li>
			</ul>
		</div>
	);
}

export default DropDown;

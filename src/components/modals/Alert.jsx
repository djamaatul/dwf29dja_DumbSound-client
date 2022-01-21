import React, { useState } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';

function AlertModal(props) {
	const [show, setShow] = useState(true);
	return (
		<Modal show={show} onHide={() => setShow(!show)} size='sm' centered>
			<Alert variant={props.status} className='mb-0 text-center'>
				{props.message}
			</Alert>
		</Modal>
	);
}

export default AlertModal;

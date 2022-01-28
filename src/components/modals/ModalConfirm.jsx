import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalConfirm(props) {
	return (
		<Modal show={props.show} size='sm' onHide={props.setShow}>
			<Modal.Body>Are you sure ? </Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={props.setShow}>
					Close
				</Button>
				<Button variant='primary' onClick={props.handleDelete}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalConfirm;

import React from 'react';
import { Modal } from 'react-bootstrap';

function PreviewImage(props) {
	return (
		<Modal show={props.show} onHide={props.toggleShow}>
			<img src={props.attachment} alt='' />
		</Modal>
	);
}

export default PreviewImage;

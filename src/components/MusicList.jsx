import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalConfirm from '../components/modals/ModalConfirm';
import { API } from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function MusicList(props) {
	const [deleteModal, setDelete] = useState(false);
	const handleDelete = async () => {
		const response = await API.delete(`/music/${props.id}`);
		setDelete(!deleteModal);
		alert(response.data.message);
		props.update();
	};
	return (
		<div className='d-flex gap-2 bg-primary my-2 rounded'>
			<div
				style={{
					backgroundImage: `url("${props.thumbnail}")`,
					width: 100,
					height: 100,
				}}
			></div>
			<div className='d-flex flex-column justify-content-center' style={{ flex: 1 }}>
				<h3>{props.title}</h3>
				<p>{props.artist}</p>
			</div>
			<div className='d-flex align-items-center me-4'>
				<Button onClick={() => setDelete(!deleteModal)}>
					<FontAwesomeIcon icon={faTrash} color='white' />
				</Button>
			</div>
			{deleteModal && (
				<ModalConfirm handleDelete={handleDelete} show={deleteModal} setShow={() => setDelete(!deleteModal)} />
			)}
		</div>
	);
}

export default MusicList;

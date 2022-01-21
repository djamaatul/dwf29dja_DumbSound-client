import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function Cards(props) {
	return (
		<Card style={{ maxHeight: 300, borderRadius: 10, backgroundColor: '#3A3A3A', height: 260 }}>
			<div style={{ padding: 10 }}>
				<div
					style={{
						backgroundImage: `url("${props.thumbnail}")`,
						width: '100%',
						height: '165px',
						backgroundSize: 'cover',
					}}
				></div>
			</div>
			<Card.Footer style={{ borderTop: 0 }} className='text-white'>
				<Row>
					<Col xs={10} className=''>
						<Row>
							<Col xs={12}>
								<h5>{props.artist.slice(0, 15)}</h5>
							</Col>
							<Col xs={12}>
								<p>{props.title.slice(0, 20)}</p>
							</Col>
						</Row>
					</Col>
					<Col xs={2} className='d-flex justify-content-end'>
						<p>{props?.year}</p>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
}

export default Cards;

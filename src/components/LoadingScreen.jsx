import React from 'react';

function Loading() {
	return (
		<div
			className='position-fixed d-flex justify-content-center align-items-center'
			style={{ backgroundColor: 'rgba(0,0,0,0.9)', width: '100vw', height: '100%', zIndex: 99999 }}
		>
			<div className='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loading;

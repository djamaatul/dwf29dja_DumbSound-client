import React from 'react';

function Loading() {
	return (
		<div
			className='position-absolute end-0 start-0 top-0 bottom-0 d d-flex justify-content-center align-items-center'
			style={{ background: 'rgba(0,0,0,0.1)' }}
		>
			<div class='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loading;

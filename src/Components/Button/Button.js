import React from 'react';
import './button.css';

export const Button = ({ children, onClick, renderIcon }) => {
	return (
		<button type='button' onClick={onClick} className='action-btn'>
			{renderIcon && (
				<div className='button-icon-container'>{renderIcon()}</div>
			)}
			<div className='button-text-container'>{children}</div>
		</button>
	);
};

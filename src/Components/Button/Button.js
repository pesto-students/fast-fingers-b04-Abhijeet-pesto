import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick, renderIcon }) => {
	return (
		<button type='button' onClick={onClick} className='action-btn'>
			{renderIcon && <div className='button-icon-container'>{renderIcon}</div>}
			<div className='button-text-container'>{children}</div>
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	renderIcon: PropTypes.element,
};

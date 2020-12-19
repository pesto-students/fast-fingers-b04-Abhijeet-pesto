import React from 'react';
import './TextInput.css';

export const TextInput = ({ value, placeholder, onChange }) => {
	return (
		<div className='user-input-container'>
			<input
				type='text'
				className='user-input'
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

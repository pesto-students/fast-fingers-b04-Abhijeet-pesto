import React from 'react';
import './TextInput.css';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

export const TextInput = ({ value, className, placeholder, onChange }) => {
	return (
		<FormControl
			type='text'
			className={className}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

TextInput.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

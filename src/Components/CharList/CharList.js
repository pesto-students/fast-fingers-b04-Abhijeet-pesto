import React from 'react';
import PropTypes from 'prop-types';
import './CharList.css';
import { getUniqueKey } from '../../utilities';

export const CharList = ({ word, currentAnswer }) => {
	const listitems = word.split('').map((char, index) => {
		return (
			<span
				key={getUniqueKey()}
				style={{
					color: currentAnswer[index]
						? currentAnswer[index].toLowerCase() === char.toLowerCase()
							? '#54ba18'
							: '#445298'
						: '#ffffff',
				}}
			>
				{char}
			</span>
		);
	});
	return <div className='word-container'>{listitems}</div>;
};

CharList.propTypes = {
	word: PropTypes.string.isRequired,
};

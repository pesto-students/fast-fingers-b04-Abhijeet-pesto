import React from 'react';

export const CharList = ({ word, currentAnswer }) => {
	const listitems = word.split('').map((char, index) => {
		return (
			<span
				key={index}
				style={{
					color: currentAnswer[index]
						? currentAnswer[index].toLowerCase() === char.toLowerCase()
							? '#54ba18'
							: '#445298'
						: '#ffffff',
				}}>
				{char}
			</span>
		);
	});
	return <div>{listitems}</div>;
};

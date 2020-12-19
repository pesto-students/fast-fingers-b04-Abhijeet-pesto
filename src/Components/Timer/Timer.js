import React from 'react';
import './Timer.css';

export const Timer = ({
	word,
	pathColor,
	startTimeInSeconds,
	timeRemainingInSeconds,
}) => {
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		let seconds = time % 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`;
	};

	// const setRemainingPathColor = (timeLeft) => {
	//   const { alert, warning } = this.colorCodes; /**import color codes or pass as props */
	//   if(timeLeft <= alert.threshold){
	//     this.remainingPathColor = alert.color
	//   } else if(timeLeft <= warning.threshold) {
	//     this.remainingPathColor = warning.color
	//   }
	// }

	return (
		<div className='base-timer'>
			<svg
				className='base-timer__svg'
				viewBox='0 0 100 100'
				xmlns='http://www.w3.org/2000/svg'>
				<g className='base-timer__circle'>
					<circle className='base-timer__path-elapsed' cx='50' cy='50' r='45' />
					<path
						id='base-timer-path-remaining'
						className='base-timer__path-remaining'
						key={word}
						style={{
							stroke: `${pathColor}`,
							animation: `countdown-animation ${startTimeInSeconds}s linear`,
						}}
						d='
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              '></path>
				</g>
			</svg>
			<span id='base-timer-label' className='base-timer__label'>
				{formatTime(timeRemainingInSeconds)}
			</span>
		</div>
	);
};

import React, { useState, useEffect } from 'react';
import './Timer.css';

const COLORS = {
	INFO: 'green',
	WARN: '#FFCC00',
	ALERT: 'red',
};

export const Timer = React.memo(
	({ startTimeInSeconds, onTimeChange, onTimeOver }) => {
		const colorCodes = {
			info: {
				color: COLORS.INFO,
			},
			warning: {
				color: COLORS.WARN,
				threshold: Math.ceil(startTimeInSeconds * 0.5),
			},
			alert: {
				color: COLORS.ALERT,
				threshold: Math.ceil(startTimeInSeconds * 0.25),
			},
		};

		const [timeLeft, setTimeLeft] = useState(startTimeInSeconds);
		const [timePassed, setTimePassed] = useState(0);
		const [pathColor, setPathColor] = useState(colorCodes.info.color);

		useEffect(() => {
			const timerInterval = setInterval(() => {
				if (timeLeft <= 0) {
					clearInterval(timerInterval);
					onTimeOver();
				} else {
					console.log(timeLeft);
					const timerValue = timeLeft - 1;
					const { alert, warning } = colorCodes;
					if (timerValue <= alert.threshold) {
						setPathColor(alert.color);
					} else if (timerValue <= warning.threshold) {
						setPathColor(warning.color);
					}
					setTimePassed(timePassed + 1);
					setTimeLeft(timerValue);
					onTimeChange(timePassed + 1);
				}
			}, 1000);
			return () => {
				clearInterval(timerInterval);
			};
		});

		const formatTime = (time) => {
			const minutes = Math.floor(time / 60);
			let seconds = time % 60;
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}
			return `${minutes}:${seconds}`;
		};

		return (
			<div className='base-timer'>
				<svg
					className='base-timer__svg'
					viewBox='0 0 100 100'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g className='base-timer__circle'>
						<circle
							className='base-timer__path-elapsed'
							cx='50'
							cy='50'
							r='45'
						/>
						<path
							id='base-timer-path-remaining'
							className='base-timer__path-remaining'
							style={{
								stroke: `${pathColor}`,
								animation: `countdown-animation ${startTimeInSeconds}s linear`,
							}}
							d='
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              '
						></path>
					</g>
				</svg>
				<span id='base-timer-label' className='base-timer__label'>
					{formatTime(timeLeft)}
				</span>
			</div>
		);
	},
);

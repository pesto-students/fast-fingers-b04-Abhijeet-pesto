import React, { useState, useEffect, useCallback } from 'react';
import { GameScreenShell } from '../../shell';
import { Timer, CharList, TextInput } from '../../components';
import dictionary from '../../assets/data/dictionary.json';
import { playerDetailsInstance } from '../../utilities';
import { useHistory } from 'react-router-dom';

export const InGame = ({
	// word,
	// currentAnswer,
	// countdownTimer,
	// timeRemaining,
	// pathColor,
	// inputValue,
	// onAnswerChange,
	difficulty,
}) => {
	//console.log(difficulty);
	const [currentWord, setCurrentWord] = useState('');
	const [answer, setAnswer] = useState('');
	const [difficultyFactor, setDifficultyFactor] = useState(difficulty.factor);
	const [currentScore, setCurrentScore] = useState(0);
	const [timeSpentInGame, setTimeSpentInGame] = useState(0);
	const history = useHistory();

	const getNewWord = (factor) => {
		if (factor >= 1 && factor < 1.5) {
			const dict = dictionary.filter((word) => word.length <= 4);
			return dict[Math.floor(Math.random() * dict.length)];
		} else if (factor >= 1.5 && factor < 2) {
			const dict = dictionary.filter(
				(word) => word.length >= 5 && word.length <= 8,
			);
			return dict[Math.floor(Math.random() * dict.length)];
		} else if (factor >= 2) {
			const dict = dictionary.filter((word) => word.length > 8);
			return dict[Math.floor(Math.random() * dict.length)];
		}
	};

	useEffect(() => {
		setCurrentWord(getNewWord(difficultyFactor));
	}, [difficultyFactor]);

	const calcTimeForWord = useCallback(() => {
		return Math.ceil(currentWord.length / difficultyFactor);
	}, [currentWord, difficultyFactor]);

	const onAnswerChange = (event) => {
		const {
			target: { value: currentAnswer },
		} = event;
		setAnswer(currentAnswer);
		if (currentAnswer.toLowerCase() === currentWord.toLowerCase()) {
			setDifficultyFactor(difficultyFactor + 0.01);
			setAnswer('');
			setCurrentScore(currentScore + timeSpentInGame);
		}
	};

	const onTimeChange = useCallback((timePassed) => {
		setTimeSpentInGame(timePassed);
	}, []);

	const onTimeOver = useCallback(() => {
		playerDetailsInstance.addScore(currentScore);
		history.push('/end');
	}, []);

	return (
		<GameScreenShell
			playerName={''}
			difficultyLevel={''}
			score={''}
			actionButton={''}
		>
			<div className='in-game-container'>
				<Timer
					key={currentWord}
					startTimeInSeconds={calcTimeForWord()}
					onTimeChange={onTimeChange}
					onTimeOver={onTimeOver}
				/>
				<CharList word={currentWord} currentAnswer={answer.split('')} />
				<TextInput value={answer} onChange={onAnswerChange} />
				{/* <div className="userInpCont">
			<input type="text" className="userInp" 
				value={this.props.inputValue}
				onChange={(e) => this.props.onAnswerChange(e.target.value)}
			/>
		</div> */}
			</div>
		</GameScreenShell>
	);
};

import React from 'react';
import { GameScreenShell } from '../../shell';
import { Timer, CharList, TextInput } from '../../components';

export const InGame = ({
	word,
	currentAnswer,
	countdownTimer,
	timeRemaining,
	pathColor,
	inputValue,
	onAnswerChange,
}) => {
	return (
		<GameScreenShell
			playerName={''}
			difficultyLevel={''}
			score={''}
			actionButton={''}>
			<div className='in-game-container'>
				<div>
					<Timer
						word={word}
						startTimeInSeconds={countdownTimer}
						timeRemainingInSeconds={timeRemaining}
						pathColor={pathColor}
					/>
				</div>
				<div className='word-container'>
					<CharList word={word} currentAnswer={currentAnswer} />
				</div>
				<TextInput value={inputValue} onChange={onAnswerChange} />
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

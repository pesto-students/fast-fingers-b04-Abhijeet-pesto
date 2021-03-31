import React from 'react';
import './EndGame.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { playerDetailsInstance } from '../../utilities';
import { GameScreenShell } from '../../shell';
import { Button } from '../../components';
import { IconReload } from '../../components/Icons';

export const EndGame = () => {
	const scores = playerDetailsInstance.getScores();
	const history = useHistory();
	const getGameNumber = () => {
		return scores.length;
	};

	const getGameScore = () => {
		return scores[scores.length - 1];
	};

	const restartGame = () => {
		history.push('/game');
	};
	return (
		<GameScreenShell
			playerName={playerDetailsInstance.getName()}
			difficultyLevel={''}
			score={null}
			actionButton={''}
		>
			<Container fluid className='endGameCont'>
				<Row>
					<Col className='gameDetails'>
						<span>SCORE : GAME {getGameNumber()}</span>
					</Col>
				</Row>
				<Row>
					<Col className='endScoreDetails'>
						<span>{getGameScore()}</span>
					</Col>
				</Row>
				<Row>
					<Col></Col>
				</Row>
				<Row>
					<Col>
						<Button renderIcon={<IconReload />} onClick={restartGame}>
							PLAY AGAIN
						</Button>
						{/* <div
							className='replayIconCont'
							onClick={() => this.props.restart()}
						>
							<img
								alt='replay icon'
								src={replay}
								srcSet={replay2x}
								className='replayIcon'
							/>
						</div>
						<div className='playAgainCont' onClick={() => this.props.restart()}>
							<span>PLAY AGAIN</span>
						</div> */}
					</Col>
				</Row>
			</Container>
		</GameScreenShell>
	);
};

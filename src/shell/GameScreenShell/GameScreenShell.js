import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GameHeader } from '../Header/GameHeader';
import './GameScreenShell.css';

export const GameScreenShell = ({
	playerName,
	difficultyLevel,
	score,
	actionButton,
	children,
}) => {
	return (
		<Container fluid className='gameCont'>
			<Row>
				<Col>
					<GameHeader
						playerName={playerName}
						difficultyLevel={difficultyLevel}
						score={score}
					/>
					{children}
					<div className='actionBtnCont'>{actionButton}</div>
				</Col>
			</Row>
		</Container>
	);
};

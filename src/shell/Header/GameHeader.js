import React from 'react';
import './GameHeader.css';
import { Container, Row, Col } from 'react-bootstrap';
import { IconPerson, IconGamepad } from '../../components/Icons';

export const GameHeader = ({ playerName, difficultyLevel, score }) => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<div className='userDetails'>
						<div className='userIconCont'>
							<IconPerson className='userIcon' />
						</div>
						<div className='userNameCont'>
							<span>{playerName}</span>
						</div>
					</div>
				</Col>
				<Col>
					<div className='gameTitleCont'>
						<span>Fast Fingers</span>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='difficultyDetails'>
						<div className='gamepadIconCont'>
							<IconGamepad className='gamepadIcon' />
						</div>
						<div className='levelCont'>
							<span>LEVEL : {difficultyLevel}</span>
						</div>
					</div>
				</Col>
				<Col>
					{/* {this.props.status === 'running' && (
						<div className='scoreDetails'>
							<span>SCORE : {score}</span>
						</div>
					)} */}
				</Col>
			</Row>
		</Container>
	);
};

import React, { useState } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IconKeyboard, IconPlay } from '../../components/Icons';
import { playerDetailsInstance } from '../../utilities';
import { Button, TextInput } from '../../components';

export const Home = (props) => {
	const [playerName, setPlayerName] = useState(playerDetailsInstance.getName());
	const [errorMessage, setErrorMessage] = useState(null);
	const history = useHistory();

	const onPlayerNameChange = (event) => {
		console.log('chnage');
		const {
			target: { value: newName },
		} = event;
		if (errorMessage) {
			setErrorMessage(null);
		}
		setPlayerName(newName);
	};

	const validateInputs = () => {
		console.log('validate');
		if (!playerName || playerName.length === 0) {
			setErrorMessage('Please enter your name!');
			return false;
		}

		return true;
	};

	const onStartButtonClick = () => {
		if (validateInputs()) {
			playerDetailsInstance.setName(playerName);
			history.push('/game');
		}
	};

	return (
		<Container fluid className='home-container'>
			<Row>
				<Col>
					<IconKeyboard />
				</Col>
			</Row>
			<Row>
				<Col>
					<span className='game-title'>fast fingers</span>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row className='sub-heading-container'>
						<Col xs={2} sm={2} md={2} lg={2} xl={2} className='no-padding'>
							<div className='line'></div>
						</Col>
						<Col xs={6} sm={6} md={6} lg={6} xl={6}>
							{/**xs={6} sm={6} md={7} lg={7} xl={7} */}
							<span className='sub-heading'>the ultimate typing game</span>
						</Col>
						<Col xs={2} sm={2} md={2} lg={2} xl={2} className='no-padding'>
							<div className='line'></div>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='input-container'>
						<Form>
							<Form.Group controlId='userName'>
								<TextInput
									value={playerName}
									className='name-input'
									placeholder='TYPE YOUR NAME'
									onChange={onPlayerNameChange}
								/>
								{errorMessage && <span className='error'>{errorMessage}</span>}
							</Form.Group>
							<Form.Group
								controlId='difficultyLevel'
								className='difficulty-level-container'
							>
								<Form.Control
									as='select'
									className='difficulty-select'
									onChange={props.changeDifficulty}
								>
									<option value='1'>Easy</option>
									<option value='1.5'>Medium</option>
									<option value='2'>Hard</option>
								</Form.Control>
							</Form.Group>
						</Form>
					</div>
				</Col>
			</Row>
			<Row className='start-btn-container'>
				{/**className='startGameCont' */}
				<Col>
					<Button
						renderIcon={<IconPlay className='icon-play-svg' />}
						onClick={onStartButtonClick}
					>
						START GAME
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

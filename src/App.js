import React from 'react';
import { Home, InGame, EndGame } from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			difficultyFactor: 1,
			difficultyLevel: 'EASY',
		};
	}

	setDifficultyLevel = (event) => {
		const {
			target: { value: level },
		} = event;
		this.setState({
			difficultyFactor: level,
		});
	};

	getDifficultyLevel = (factor) => {
		return factor < 1.5
			? 'EASY'
			: factor >= 1.5 && factor < 2
			? 'MEDIUM'
			: 'HARD';
	};

	render() {
		return (
			<div className='App'>
				<Router>
					<Switch>
						<Route path='/game'>
							<InGame
								difficulty={{
									level: this.state.difficultyLevel,
									factor: this.state.difficultyFactor,
								}}
							/>
						</Route>
						<Route path='/end'>
							<EndGame />
						</Route>
						<Route path='/'>
							<Home changeDifficulty={this.setDifficultyLevel} />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

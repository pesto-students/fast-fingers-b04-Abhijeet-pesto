// class PlayerDetails {
// 	_name = localStorage.getItem('$ff_playerName') || '';
// 	_scores = localStorage.getItem('$ff_scores')
// 		? JSON.parse(localStorage.getItem('$ff_scores'))
// 		: [];

// 	get name() {
// 		return this._name;
// 	}

// set name(newName) {
// 	if (this._name !== newName) {
// 		this._scores = [];
// 		localStorage.setItem('$ff_scores', JSON.stringify([]));
// 	}
// 	this._name = newName;
// 	localStorage.setItem('$ff_playerName', newName);
// }

// 	get scores() {
// 		return this._scores;
// 	}

// 	set scores(newScores) {
// 		this._scores = newScores;
// 		localStorage.setItem('$ff_scores', JSON.stringify(newScores));
// 	}

// 	addScore = (score) => {
// 		this._scores.push(score);
// 		localStorage.setItem('$ff_scores', JSON.stringify(this._scores));
// 	};
// }
const playerDetails = (function () {
	function init() {
		let name = localStorage.getItem('$ff_playerName') || '';
		let scores = localStorage.getItem('$ff_scores')
			? JSON.parse(localStorage.getItem('$ff_scores'))
			: [];
		return {
			getName: () => {
				return name;
			},

			setName: (newName) => {
				if (name !== newName) {
					scores = [];
					localStorage.setItem('$ff_scores', JSON.stringify([]));
				}
				name = newName;
				localStorage.setItem('$ff_playerName', newName);
			},

			getScores: () => {
				return scores;
			},

			setScores: (newScores) => {
				scores = newScores;
				localStorage.setItem('$ff_scores', JSON.stringify(newScores));
			},

			addScore: (score) => {
				scores.push(score);
				localStorage.setItem('$ff_scores', JSON.stringify(scores));
			},
		};
	}
	let instance;
	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		},
	};
})();

export const playerDetailsInstance = playerDetails.getInstance();

import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {Game} from './Components/Game/Game';
import dictionary from './assets/data/dictionary.json'

export class App extends React.Component {

  timerInterval;
  colorCodes = {
    info: {
      color: "green"
    },
    warning: {
      color: "#FFCC00",
      threshold: 0
    },
    alert: {
      color: "red",
      threshold: 0
    }
  };

  constructor(props){
    super(props);
    this.state = {
      userName: null,
      difficultyFactor: 1,
      difficultyLevel: 'EASY',
      dictionary,
      currentWordList: [],
      currentWord: null,
      currentUserInput: '',
      currentAnswer: [],
      score: 0,
      gameState: 'start',
      errorMsg: null,
      timer: 0,
      timeRemainingInSeconds: 0,
      remainingPathColor: this.colorCodes.info.color,
      games: [],
      currentGame: null
    }
  }

  setUserName = (name) => {
    this.setState({
      userName: name,
      errorMsg: null
    });
  }

  setDifficultyLevel = (level) => {
    this.setState({
      difficultyFactor: level
    })
  }

  getDifficultyLevel = (factor) => {
    return factor < 1.5 ? 'EASY' : (
      factor >= 1.5 && factor < 2 ? 'MEDIUM' : 'HARD'
    );
  }

  startGame = () => {
    if(!this.state.userName || this.state.userName.length === 0){
      this.setState({
        errorMsg: 'Please enter your name!'
      })
      return;
    } else {
      const filteredWords = this.state.dictionary.filter(word => {
        if (this.state.difficultyFactor === 1){
          return word.length <= 4;
        } else if (this.state.difficultyFactor === 1.5) {
          return word.length >= 5 || word.length <= 8;
        }
        return word.length > 8;
      });
      const newWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      const timerValue = Math.ceil(newWord.length / this.state.difficultyFactor);
      this.setState({
        currentWordList: filteredWords,
        currentWord: newWord,
        timer: timerValue < 2 ? 2 : timerValue,
        timeRemainingInSeconds: timerValue < 2 ? 2 : timerValue,
        difficultyLevel: this.getDifficultyLevel(this.state.difficultyFactor),
        gameState: 'running'
      });
      this.colorCodes.warning.threshold = timerValue * 0.5;
      this.colorCodes.alert.threshold = timerValue * 0.25;
      this.startTimer();
    }
  }

  restartGame = () => {
    const filteredWords = this.state.dictionary.filter(word => word.length <= 4);
    const newWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    const timerValue = Math.ceil(newWord.length / this.state.difficultyFactor);
    this.setState({
      difficultyFactor: 1,
      currentUserInput: '',
      currentAnswer: [],
      score: 0,
      remainingPathColor: this.colorCodes.info.color,
      currentGame: null,
      currentWordList: filteredWords,
      currentWord: newWord,
      timer: timerValue < 2 ? 2 : timerValue,
      timeRemainingInSeconds: timerValue < 2 ? 2 : timerValue,
      difficultyLevel: this.getDifficultyLevel(this.state.difficultyFactor),
      gameState: 'running'
    })
    this.colorCodes.warning.threshold = timerValue * 0.5;
    this.colorCodes.alert.threshold = timerValue * 0.25;
    this.startTimer();
  }

  quitGame = () => {
    this.setState({
      difficultyFactor: 1,
      difficultyLevel: 'EASY',
      currentWordList: [],
      currentWord: null,
      currentUserInput: '',
      currentAnswer: [],
      score: 0,
      gameState: 'start',
      errorMsg: null,
      timer: 0,
      timeRemainingInSeconds: 0,
      remainingPathColor: this.colorCodes.info.color,
      games: [],
      currentGame: null
    })
  }

  handleAnswerChange = (text) => {
    this.setState({
      currentUserInput: text,
      currentAnswer: text.split('')
    });
    if (text.toLowerCase() === this.state.currentWord.toLowerCase()) {
      const newDifficultyFactor = this.state.difficultyFactor + 0.01;
      let newWordList = [];
      if (newDifficultyFactor >= 1.5 && newDifficultyFactor < 2 && 
        this.state.difficultyLevel === 'EASY') {
        newWordList = this.state.dictionary.filter(word => 
          word.length >= 5 || word.length <= 8
        );
      } else if (newDifficultyFactor >= 2 && this.state.difficultyLevel === 'MEDIUM') {
        newWordList = this.state.dictionary.filter(word => 
          word.length > 8
        );
      }
      if (newWordList.length > 0) {
        this.updateWordList(newWordList);
        this.setNewWordandTimer(newDifficultyFactor, newWordList);
      } else {
        this.setNewWordandTimer(newDifficultyFactor);
      }
      this.updateDifficulty(newDifficultyFactor);
      this.clearInputandAnswer();
    } 
  }

  clearInputandAnswer = () => {
    this.setState({
      currentUserInput: '',
      currentAnswer: []
    })
  }

  updateDifficulty = (factor) => {
    this.setState({
      difficultyFactor: factor,
      difficultyLevel: this.getDifficultyLevel(factor)
    });
  }

  updateWordList = (newList) => {
    this.setState({
      currentWordList: newList
    });
  }

  endGame = (score) => {
    clearInterval(this.timerInterval);
    const prevGames = [...this.state.games];
    const newGame = {
      tag: `GAME ${prevGames.length + 1}`,
      score: score
    }
    prevGames.push(newGame);
    this.setState({
      gameState: 'over',
      games: prevGames,
      currentGame: newGame
    })
  }

  setNewWordandTimer = (factor, newList = []) => {
    let newWord = '';
    if (newList.length > 0) {
      newWord = newList[Math.floor(Math.random() * newList.length)]
    } else {
      newWord = this.state.currentWordList[Math.floor(Math.random() * this.state.currentWordList.length)]
    }
    const timerValue = Math.ceil(newWord.length / factor);
    this.setState({
      currentWord: newWord,
      timer: timerValue < 2 ? 2 : timerValue,
      timeRemainingInSeconds : timerValue < 2 ? 2 : timerValue,
      remainingPathColor: this.colorCodes.info.color
    })
    this.colorCodes.warning.threshold = timerValue * 0.5;
    this.colorCodes.alert.threshold = timerValue * 0.25;
    this.restartTimer();
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  restartTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        score: this.state.score + 1,
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
      this.setRemainingPathColor(this.state.timeRemainingInSeconds);
    } else {
      clearInterval(this.timerInterval);
      this.endGame(this.state.score)
    }
  };

  setRemainingPathColor(timeLeft) {
    const { alert, warning } = this.colorCodes;
    if(timeLeft <= alert.threshold){
      this.setState({
        remainingPathColor: alert.color
      })
    } else if(timeLeft <= warning.threshold) {
      this.setState({
        remainingPathColor: warning.color
      })
    }
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  
  render() {
    return (
      <div className="App">
        {this.state.gameState === 'start' && 
          <Home 
            changeDifficulty={this.setDifficultyLevel}
            setName={this.setUserName}
            startGame={this.startGame}
            errorMessage={this.state.errorMsg}
          />
        }
        {(this.state.gameState === 'running' || this.state.gameState === 'over') && 
          <Game 
            status={this.state.gameState}
            score={this.formatTime(this.state.score)}
            playerName={this.state.userName}
            countdownTimer={this.state.timer}
            timeRemaining={this.state.timeRemainingInSeconds}
            pathColor={this.state.remainingPathColor}
            inputValue={this.state.currentUserInput}
            currentAnswer={this.state.currentAnswer}
            onAnswerChange={this.handleAnswerChange}
            stopGame={this.endGame}
            level={this.state.difficultyLevel}
            word={this.state.currentWord}
            gameDetails={this.state.currentGame}
            restart={this.restartGame}
            quitGame={this.quitGame}
            endGame={this.endGame}
          />
        } 
      </div>
    );
  }
}


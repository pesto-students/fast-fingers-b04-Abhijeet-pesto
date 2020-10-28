import React from 'react';
import './Game.css';
import { 
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import {CountdownTimer} from '../Timer/Timer';

import person from '../../assets/icons/Icon material-person.png';
import person2x from '../../assets/icons/Icon material-person@2x.png';
import gamepad from '../../assets/icons/Icon awesome-gamepad.png';
import gamepad2x from '../../assets/icons/Icon awesome-gamepad@2x.png';
import replay from '../../assets/icons/Icon open-reload.png';
import replay2x from '../../assets/icons/Icon open-reload@2x.png';
import cross from '../../assets/icons/Icon metro-cross.png';
import cross2x from '../../assets/icons/Icon metro-cross@2x.png';

export class Game extends React.Component{

  EndGame = (props) => {
    return (
      <Container fluid className="endGameCont">
        <Row>
          <Col className="gameDetails">
            <span>SCORE : {this.props.gameDetails.tag}</span>
          </Col>
        </Row>
        <Row>
          <Col className="endScoreDetails">
            <span>{this.props.score}</span>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <div className="replayIconCont" onClick={() => this.props.restart()}>
              <img alt="replay icon" src={replay} srcSet={replay2x} className="replayIcon"/>
            </div>
            <div className="playAgainCont" onClick={() => this.props.restart()}>
              <span>PLAY AGAIN</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  CharList = (props) => {
    const listitems = props.word.split('').map((char, index) => 
      <span key={index}
        style={{
          color: (this.props.currentAnswer[index] ? 
            this.props.currentAnswer[index].toLowerCase() === char.toLowerCase() ? '#54ba18' : '#445298' : '#ffffff')
        }}>
        {char}
      </span>
    );
    return (
      <div>{listitems}</div>
    );
  }

  InGame = () => {
    return (
      <div className="inGameCont">
        <div>
          <CountdownTimer 
            stopGame = {this.props.stopGame}
            word = {this.props.word}
            startTimeInSeconds = {this.props.countdownTimer} 
            timeRemainingInSeconds = {this.props.timeRemaining}
            pathColor = {this.props.pathColor}
          />
        </div>
        <div className="wordCont">
          <this.CharList word={this.props.word}/>
        </div>
        <div className="userInpCont">
          <input type="text" className="userInp" 
            value={this.props.inputValue}
            onChange={(e) => this.props.onAnswerChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  render(){
    return (
      <Container fluid className="gameCont">
        <Row>
          <Col>
            <Container fluid>
              <Row>
                <Col>
                  <div className="userDetails">
                    <div className="userIconCont">
                      <img src={person} srcSet={person2x} alt="user icon" className="userIcon"/>
                    </div>
                    <div className="userNameCont">
                      <span>{this.props.playerName}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="gameTitleCont">
                    <span>Fast Fingers</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="diffDetails">
                    <div className="gamepadIconCont">
                      <img src={gamepad} srcSet={gamepad2x} alt="gamepad icon" className="gamepadIcon"/>
                    </div>
                    <div className="levelCont">
                      <span>LEVEL : {this.props.level}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  {this.props.status === 'running' &&
                    <div className="scoreDetails">
                      <span>SCORE : {this.props.score}</span>
                    </div>
                  }
                </Col>
              </Row>
            </Container>
            <Container fluid>
              <Row>
                <Col>
                  {this.props.status === 'running' &&
                    <this.InGame />
                  }
                  {this.props.status === 'over' &&
                    <this.EndGame />
                  }
                </Col>
              </Row>
            </Container>
            <div className="quitGameCont">
              {this.props.status === 'over' &&
                <span onClick={() => this.props.quitGame()}>QUIT</span>
              }
              {this.props.status === 'running' &&
                <div>
                  <div className="closeIconCont" onClick={() => this.props.endGame(this.props.score)}>
                    <img alt="cross" src={cross} srcSet={cross2x} className="closeIcon"/>
                  </div>
                  <span className="stopGameText" onClick={() => this.props.endGame(this.props.score)}>STOP GAME</span>
                </div>
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
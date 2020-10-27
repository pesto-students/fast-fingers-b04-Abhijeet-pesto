import React from 'react';
import './Game.css';
import { 
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import {CountdownTimer} from '../Timer/Timer';

import person from '../../assets/icons/Icon material-person.png'
import person2x from '../../assets/icons/Icon material-person@2x.png'
import person3x from '../../assets/icons/Icon material-person@3x.png'
import gamepad from '../../assets/icons/Icon awesome-gamepad.png'
import gamepad2x from '../../assets/icons/Icon awesome-gamepad@2x.png'
import gamepad3x from '../../assets/icons/Icon awesome-gamepad@3x.png'


export class Game extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      currentValue: [],
      reqWord: this.props.word.split('')
    }
  }

  CharList = (props) => {
    const listitems = props.word.split('').map((char, index) => 
      <span key={index}
        style={{
          color: (this.state.currentValue[index] ? 
            this.state.currentValue[index] === char ? 'green' : 'blue' : 'white')
        }}>
        {char}
      </span>
    );
    return (
      <div>{listitems}</div>
    );
  }

  handleChange(text){
    this.setState({
      currentValue: text.split(''),
      reqWord: this.state.reqWord
    })
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
                      <img src={person} srcSet={person2x, person3x} alt="user icon" className="userIcon"/>
                    </div>
                    <div className="userNameCont">
                      <span>User Name</span>
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
                      <img src={gamepad} srcSet={gamepad2x, gamepad3x} alt="gamepad icon" className="gamepadIcon"/>
                    </div>
                    <div className="levelCont">
                      <span>LEVEL : MEDIUM</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="scoreDetails">
                    <span>SCORE : 00:30</span>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              <Row>
                <Col>
                  <div>
                    <CountdownTimer startTimeInSeconds={60}></CountdownTimer>
                  </div>
                  <div>
                    <this.CharList word={this.props.word}/>
                  </div>
                  <div className="userInpCont">
                    <input type="text" className="userInp" onChange={(e) => this.handleChange(e.target.value)}/>
                  </div>
                </Col>
                
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
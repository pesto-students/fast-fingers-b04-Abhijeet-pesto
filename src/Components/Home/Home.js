import React from 'react';
import './Home.css';
import { 
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import { ReactComponent as KeyboardImg } from '../../assets/svg/Icon awesome-keyboard.svg';
import play from '../../assets/icons/Icon awesome-play.png'
import play2x from '../../assets/icons/Icon awesome-play@2x.png'

function Home(props) {
  return (
    <Container fluid className="homeCont">
      <Row>
        <Col>
          <KeyboardImg className="icon-awesome-keyboard"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="game-title">fast fingers</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="subHeadingCont no-gutters">
            <Col>
              <div className="line"></div>
            </Col>
            <Col xs={6} sm={6} md={7} lg={7} xl={7}>
              <span className="subHeading">the ultimate typing game</span>
            </Col>
            <Col>
              <div className="line"></div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="inputContainer">
            <Form>
              <Form.Group controlId="userName">
                <Form.Control type="text" placeholder="TYPE YOUR NAME" className="nameInp" onChange={(e) => props.setName(e.target.value)}/>
                  {props.errorMessage && <span className="error">{props.errorMessage}</span>}
              </Form.Group>
              <Form.Group controlId="difficultyLevel" className="difficultyLevelCont">
                <Form.Control as="select" className="difficultyInp" onChange={(e) => props.changeDifficulty(e.target.value)}>
                  <option value="1">Easy</option>
                  <option value="1.5">Medium</option>
                  <option value="2">Hard</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="startGameCont">
        <Col>
          <div onClick={() => props.startGame()}>
            <div className="playIconCont">
              <img 
                src={play}
                srcSet={play2x}
                alt="play icon"
                className="playIcon"
              />
            </div>
            <div className="start-game">
              <span>START GAME</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
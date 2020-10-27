import React from 'react';
import './Timer.css'

export class CountdownTimer extends React.Component {

  timePassed = 0;
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
  remainingPathColor = this.colorCodes.info.color;
  constructor(props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: this.props.startTimeInSeconds
    };
    this.colorCodes.warning.threshold = this.props.startTimeInSeconds * 0.5;
    this.colorCodes.alert.threshold = this.props.startTimeInSeconds * 0.25;
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.timePassed += 1;
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
      this.setRemainingPathColor(this.state.timeRemainingInSeconds);
    } else {
      clearInterval(this.timerInterval);
    }
  };

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  };

  setRemainingPathColor(timeLeft) {
    const { alert, warning } = this.colorCodes;
    if(timeLeft <= alert.threshold){
      this.remainingPathColor = alert.color
    } else if(timeLeft <= warning.threshold) {
      this.remainingPathColor = warning.color
    }
  }

  render() {
    return (
      <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              className="base-timer__path-remaining"
              style={{
                stroke: `${this.remainingPathColor}`,
                animation: `countdown-animation ${this.props.startTimeInSeconds}s linear`
              }}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {this.formatTime(this.state.timeRemainingInSeconds)}
        </span>
      </div>
    );
  }
}
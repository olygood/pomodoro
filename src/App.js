import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 300,
      timer: 1500,
      display: 1500,
      pauseResume: 'Pause',
      startClicked: false,
      workBreak: 'Work'
      
    }
    //this.count;
  }

  start = () => {
    this.countDown(this.state.timer);
    this.setState({
      pauseResume: 'Pause',
      startClicked: true,
      workBreak: 'Work'
    })
  }

  countDown = (seconds) => {
    let then = Date.now() + seconds * 1000;
    this.count = setInterval(() => {
      let secsLeft = Math.round((then - Date.now()) /1000);
      this.setState({display: secsLeft});

      if ( secsLeft <= 0 ) {
        clearInterval(this.count);
        let audio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
        audio.play();
        if ( this.state.workBreak === 'Work') {
          this.countDown(this.state.break);
          this.setState({workBreak: 'Break'});
        } else {
          this.countDown(this.state.timer);
          this.setState({workBreak: 'Work'});
        }
      }
      console.log(secsLeft);
    }, 1000)
  }

  reset = () => {
    clearInterval(this.count);
    this.setState({display: this.state.timer})
    this.setState({startClicked: false})
  }

  pause = () => {
    clearInterval(this.count);
    this.setState({pauseResume: 'Resume'})
  }

  resume = () => {
    this.countDown(this.state.display);
    this.setState({pauseResume: 'Pause'})
  }

  breakAddMinute = () => {
    this.setState({
      break: this.state.break + 60
    })
  }

  breakMinusMinute = () => {
    if(this.state.break > 60) {
      this.setState({
        break: this.state.break - 60
      })
    }
  }

  timerAddMinute = () => { 
    this.setState({
      timer: this.state.timer + 60
    })
  }

  timerMinusMinute = () => {
    if(this.state.timer > 60) {
      this.setState({
      timer: this.state.timer - 60
      })
    }
  }

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Pomodoro oli </h1>
        <div className='flex'>
        <Timer 
          timer={this.state.timer}
          timerAddMinute={this.timerAddMinute}
          timerMinusMinute={this.timerMinusMinute} />
        <Break 
          startClicked={this.state.startClicked}
          break={this.state.break}
          breakAddMinute={this.breakAddMinute} 
          breakMinusMinute={this.breakMinusMinute} />
        </div>
        <Display 
          display={this.state.display}
          reset={this.reset}
          pause={this.pause}
          resume={this.resume}
          pauseResume={this.state.pauseResume} 
          start={this.start}
          startClicked={this.state.startClicked} />
      </div>
    );
  }
}

const Break = props => (
  <div className='timerBreak'>
    <h2>Break</h2>
    <div className='flex'>
      <button className='plusMinus' onClick={props.breakMinusMinute} >-</button>
      <p>{props.break /60}</p>
      <button className='plusMinus' onClick={props.breakAddMinute} >+</button>
    </div>
  </div>
)

const Display = props => {
  let seconds = props.display;
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  let resumePause = props.pauseResume === 'Pause' ? props.pause : props.resume;
  return(
    <div className='display'>
      <p>{display}</p>
      <button onClick={props.reset} >Reset</button>
      {props.startClicked && <button onClick={resumePause} >{props.pauseResume}</button>}
      {!props.startClicked && <button onClick={props.start}>Start</button>}
    </div>
  )
}

const Timer = props => (
  <div className='timerBreak'>
    <h2>Time</h2>
    <div className='flex'>
      <button className='plusMinus' onClick={props.timerMinusMinute} >-</button>
      <p>{props.timer /60}</p>
      <button className='plusMinus' onClick={props.timerAddMinute} >+</button>
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

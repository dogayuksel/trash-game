import React, { Component } from 'react';
import Intro from './intro';
import Game from './game';

export default class Presentation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
    };
  }

  handleStart = () => {
    this.setState({
      gameState: 1,
    });
  }

  render() {
    this.gameStates = [
      <Intro onStart={this.handleStart} />,
      <Game />,
    ];
    return this.gameStates[this.state.gameState]
  }
}

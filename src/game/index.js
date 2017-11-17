import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import TrashItem from './trash-item';

import GameStore from './stores/game-store';

import { Loop, Stage, World } from 'react-game-kit';

export default class Game extends Component {

  physicsInit = engine => {
    const ground = Matter.Bodies.rectangle(
      512, 448, 1024, 64, {
        isStatic: true,
      });
    const leftWall = Matter.Bodies.rectangle(
      -64, 288, 64, 576, {
        isStatic: true,
      });
    const rightWall = Matter.Bodies.rectangle(
      960, 288, 64, 576, {
        isStatic: true,
      });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#f22' }}>
          <World onInit={this.physicsInit}>
            <TrashItem
              store={GameStore}>
            </TrashItem>
          </World>
        </Stage>
      </Loop>
    );
  }
}

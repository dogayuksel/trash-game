import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import { observer } from 'mobx-react';
import { Loop, Stage, World } from 'react-game-kit';

import config from '../config';

import RedBox from './red-box';
import TrashItem from './trash-item';
import DebugCursor from './debug-cursor';
import GameStore from './stores/game-store';

@observer
export default class Game extends Component {

  physicsInit = engine => {
    const ground = Matter.Bodies.rectangle(
      512, 576, 1024, 20, {
        isStatic: true,
      });
    const roof = Matter.Bodies.rectangle(
      512, -10, 1024, 20, {
        isStatic: true,
      });
    const leftWall = Matter.Bodies.rectangle(
      0, 288, 20, 576, {
        isStatic: true,
      });
    const rightWall = Matter.Bodies.rectangle(
      1024, 288, 20, 576, {
        isStatic: true,
      });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, roof);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }

  handleMouseMove = (e) => {
    const {
      left, top, width, height
    } = e.currentTarget.getBoundingClientRect();
    const normalizedX = (e.clientX - left) / width * config.stageWidth;
    const normalizedY = ((e.clientY - top) /
      height * config.stageHeight);
    GameStore.setCursorPosition({ x: normalizedX, y: normalizedY });
  }

  handleMouseLeave = (e) => {
    GameStore.setUserCarriesItemFalse();
  }

  handleMouseUp = (e) => {
    if (GameStore.userCarriesItem) {
      GameStore.setUserCarriesItemFalse();
    }
  }

  render() {
    const debug = config.debugMode;
    return (
      <Loop>
        <Stage
          height={config.stageHeight}
          width={config.stageWidth}
          style={{ background: '#14c' }}
        >
          <World onInit={this.physicsInit}>
            <div
              style={{ width: '100%', height: '100%' }}
              onMouseMove={this.handleMouseMove}
              onMouseLeave={this.handleMouseLeave}
              onMouseUp={this.handleMouseUp}
            >
              {debug && <DebugCursor store={GameStore} />}
              {debug && <RedBox store={GameStore} />}
              <TrashItem store={GameStore} />
            </div>
          </World>
        </Stage>
      </Loop>
    );
  }
}

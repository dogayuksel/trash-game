import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit';

@observer
export default class Game extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  update = () => {
    const { store } = this.props;
    const { body } = this.body;
    store.setItemPosition(body.position);
  };

  handleDrag = (e) => {
    const { body } = this.body;
    const speedVector = {
      x: (e.clientX - body.position.x) / 10,
      y: (e.clientY - body.position.y) / 10,
    };
    /* Last drag event fires x:0 y:0, omit when so */
    if (e.clientX === 0 && e.clientY === 0) {
      return
    }
    this.move(body, speedVector);
  }

  move = (body, speedVector) => {
    Matter.Body.setVelocity(body, speedVector);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { x, y } = this.props.store.itemPosition;
    const { scale } = this.context;

    return {
      position: 'absolute',
      transform: `translate(${x * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  render() {
    const { x, y } = this.props.store.itemPosition;
    return (
      <div
        style={this.getWrapperStyles()}
        onDrag={this.handleDrag}
      >
        <Body
          args={[x, y, 100, 100]}
          inertia={Infinity}
          ref={b => {
              this.body = b;
          }}>
          <Sprite
            repeat={false}
            src="assets/trash-piece.png"
            scale={this.context.scale * 0.1}
            state={0}
            steps={[0]}
            tileHeight={708}
            tileWidth={708}>
          </Sprite>
        </Body>
      </div>
    );
  }
}

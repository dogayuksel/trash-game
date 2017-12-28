import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit';

@observer
export default class RedBox extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  update = () => {
    const { body } = this.body;
    const { store } = this.props;
    store.setRedBoxPosition(body.position);
    store.setRedBoxAngle(body.angle);
  };

  handleDragStart = (e) => {
    e.preventDefault();
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { x, y } = this.props.store.redBoxPosition;
    const angle = this.props.store.redBoxAngle;
    const { scale } = this.context;

    const t_x = x - 50;
    const t_y = y - 50;

    return {
      position: 'absolute',
      transform: (`translate(${t_x * scale}px, ` +
                  `${t_y * scale}px) ` +
                  `rotate(${angle}rad)`),
      transformOrigin: 'center',
    };
  }

  render() {
    const { x, y } = this.props.store.redBoxPosition;
    return (
      <div
        style={this.getWrapperStyles()}
        onDragStart={this.handleDragStart}
      >
        <Body
          args={[x, y, 100, 100]}
          frictionAir={0.001}
          friction={0.3}
          ref={b => {
              this.body = b;
          }}
        >
          <Sprite
            repeat={false}
            src="assets/red-box.jpg"
            scale={this.context.scale}
            state={0}
            steps={[0]}
            tileHeight={100}
            tileWidth={100}>
          </Sprite>
        </Body>
      </div>
    );
  }
}

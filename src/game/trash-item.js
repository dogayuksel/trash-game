import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit';

@observer
export default class TrashItem extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  update = () => {
    const { store } = this.props;
    const { cursorPosition } = store;
    const { body } = this.body;
    store.setItemPosition(body.position);
    if (store.userCarriesItem) {
      const speedVector = {
        x: (cursorPosition.x - body.position.x - 35) / 10,
        y: (cursorPosition.y - body.position.y - 35) / 10,
      };
      this.move(body, speedVector);
    }
  };

  handleDragStart = (e) => {
    e.preventDefault();
  }

  handleMouseDown = (e) => {
    console.log('down');
    const { store } = this.props;
    store.toggleUserCarriesItem();
  }

  handleMouseUp = (e) => {
    console.log('up');
    const { store } = this.props;
    store.toggleUserCarriesItem();
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
        onDragStart={this.handleDragStart}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <Body
          args={[x, y, 71, 71]}
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

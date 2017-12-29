import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit';

const asset = {
  shape: 'fromVertices',
  vertices: [
    {x: 1.25, y: 45.25},
    {x: 38.25, y: 2},
    {x: 71.5, y: 5.25},
    {x: 97.5, y: 27.75},
    {x: 90.5, y: 40.25},
    {x: 94.5, y: 67.5},
    {x: 79.75, y: 93.5},
    {x: 69.25, y: 93.5},
    {x: 51.75, y: 100},
    {x: 15, y: 87.75}
  ],
  radius: 50,
  imageRadius: 673,
  url: "assets/trash-piece.png",
}

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
    store.setItemAngle(body.angle);
    if (store.userCarriesItem) {
      const speedVector = {
        x: (cursorPosition.x - body.position.x) / 10,
        y: (cursorPosition.y - body.position.y) / 10,
      };
      this.move(body, speedVector);
    }
  };

  handleDragStart = (e) => {
    e.preventDefault();
  }

  handleMouseDown = (e) => {
    const { store } = this.props;
    store.setUserCarriesItemTrue();
  }

  handleMouseUp = (e) => {
    const { store } = this.props;
    store.setUserCarriesItemFalse();
  }

  move = (body, speedVector) => {
    Matter.Body.setVelocity(body, speedVector);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    const { body } = this.body;
    Matter.Body.setAngularVelocity(body, 0.05);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { x, y } = this.props.store.itemPosition;
    const angle = this.props.store.itemAngle;
    const { scale } = this.context;

    const t_x = x - asset.radius;
    const t_y = y - asset.radius;

    return {
      position: 'absolute',
      width: `${asset.radius * 2 * scale}px`,
      height: `${asset.radius * 2 * scale}px`,
      transform: (`translate(${t_x * scale}px, ` +
                  `${t_y * scale}px) ` +
                  `rotate(${angle}rad)`),
      transformOrigin: 'center',
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
          args={[x, y, asset.vertices]}
          shape={asset.shape}
          frictionAir={0.001}
          friction={0.2}
          restitution={0.3}
          ref={b => {
              this.body = b;
          }}>
          <Sprite
            repeat={false}
            src={asset.url}
            scale={(this.context.scale *
                2 * asset.radius) / asset.imageRadius}
            state={0}
            steps={[0]}
            tileHeight={asset.imageRadius}
            tileWidth={asset.imageRadius}
          >
          </Sprite>
        </Body>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit';

@observer
class TrashItem extends Component {
  static propTypes = {
    store: PropTypes.object,
    asset: PropTypes.object,
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
    const { asset } = this.props;

    const comoy_x = Math.sin(angle) * asset.centerOfMassOffsetY;
    const comoy_y = Math.cos(angle) * asset.centerOfMassOffsetY;

    const t_x = x - comoy_x - asset.width / 2;
    const t_y = y + comoy_y - asset.height / 2;

    return {
      position: 'absolute',
      width: `${asset.width * scale}px`,
      height: `${asset.height * scale}px`,
      transform: (`translate(${t_x * scale}px, ` +
                  `${t_y * scale}px) ` +
                  `rotate(${angle}rad)`),
      transformOrigin: 'center',
    };
  }

  render() {
    const { x, y } = this.props.store.itemPosition;
    const { asset } = this.props;
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
                asset.width) / asset.imageWidth}
            state={0}
            steps={[0]}
            tileHeight={asset.imageHeight}
            tileWidth={asset.imageWidth}
          >
          </Sprite>
        </Body>
      </div>
    );
  }
}

export default TrashItem;

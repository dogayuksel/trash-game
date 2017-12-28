import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class DebugCursor extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static contextTypes = {
    scale: PropTypes.number,
  };

  getDebugStyles() {
    const { x, y } = this.props.store.cursorPosition;
    const { scale } = this.context;

    return {
      position: 'absolute',
      backgroundColor: 'red',
      height: '0.5em',
      width: '0.5em',
      transform: `translate(${x * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  render() {
    return (
      <div style={this.getDebugStyles()}>
      </div>
    );
  }
}

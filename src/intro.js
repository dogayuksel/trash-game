import React, { Component } from 'react';

export default class Intro extends Component {

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.props.onStart();
    }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    return (
      <div>
        <p className="start">
          React Game Kit works
        </p>
        <p className="description">
          Press enter to continue
        </p>
      </div>
    )
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import TrashItem from './trash-item';
import assets from './trash-config';

@observer
class TrashFactory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trashItem: 0
    }
  }

  static contextTypes = {
    loop: PropTypes.object,
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  update = () => {
    const { store } = this.props;
    const { itemPosition: { x } } = store;
    const { trashItem } = this.state;
    if (x > 800) {
      store.resetItemPosition();
      this.setState({trashItem: trashItem === 0 ? 1 : 0});
    }
  }

  render() {
    const { store } = this.props;
    const { trashItem } = this.state;

    return (
      <div>
        {trashItem === 0 &&
         <TrashItem store={store} asset={assets[trashItem]} />
        }
        {trashItem === 1 &&
         <TrashItem store={store} asset={assets[trashItem]} />
        }
      </div>
    )
  }
}

export default TrashFactory;

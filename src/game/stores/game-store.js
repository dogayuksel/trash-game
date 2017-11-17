import { observable } from 'mobx';

class GameStore {
  @observable itemPosition = { x: 0, y: 0 };

  setItemPosition(position) {
    this.itemPosition = position;
  }
}

export default new GameStore();

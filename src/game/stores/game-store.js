import { observable } from 'mobx';

class GameStore {
  @observable itemPosition = { x: 90, y: 40 };
  @observable itemAngle = 0;
  @observable redBoxPosition = { x: 250, y: 40 };
  @observable redBoxAngle = 0;
  @observable cursorPosition = { x: 0, y: 0 };
  @observable userCarriesItem = false;

  setCursorPosition(position) {
    this.cursorPosition = position;
  }

  setItemPosition(position) {
    this.itemPosition = position;
  }

  setItemAngle(angle) {
    this.itemAngle = angle;
  }

  setRedBoxPosition(position) {
    this.redBoxPosition = position;
  }

  setRedBoxAngle(angle) {
    this.redBoxAngle = angle;
  }

  setUserCarriesItemTrue() {
    this.userCarriesItem = true;
  }

  setUserCarriesItemFalse() {
    this.userCarriesItem = false;
  }
}

export default new GameStore();

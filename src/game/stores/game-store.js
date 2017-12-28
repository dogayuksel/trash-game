import { observable } from 'mobx';

class GameStore {
  @observable itemPosition = { x: 0, y: 0 };
  @observable cursorPosition = { x: 0, y: 0 };
  @observable userCarriesItem = false;

  setCursorPosition(position) {
    this.cursorPosition = position;
  }

  setItemPosition(position) {
    this.itemPosition = position;
  }

  toggleUserCarriesItem() {
    this.userCarriesItem = !this.userCarriesItem;
  }

  setUserCarriesItemFalse() {
    this.userCarriesItem = false;
  }
}

export default new GameStore();

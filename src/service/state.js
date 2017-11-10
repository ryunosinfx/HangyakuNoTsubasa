import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/functions'
export default class State {
  constructor() {
    this.isLogedIn = false;
    this.isActivated = false;

  }
  set isLogedIn(isLogedIn) {
    this.isLogedIn = isLogedIn;
  }
  get isLogedIn() {
    return this.isLogedIn;
  }
  set isActivated(isActivated) {
    this.isActivated = isActivated;
  }
  get isActivated() {
    return this.isActivated;
  }
}

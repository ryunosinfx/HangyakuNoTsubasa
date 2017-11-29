import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class State {
  constructor() {
    this.isLogedIn = false;
    this.isActivated = false;
    this.route='';

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
  set route(route) {
    this.route = route;
  }
  get route() {
    return this.route;
  }
}

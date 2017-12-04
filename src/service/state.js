export default class State {
  constructor() {
    this._isLogedIn = false;
    this._isActivated = false;
    this._route='';

  }
  set isLogedIn(isLogedIn) {
    this._isLogedIn = isLogedIn;
  }
  get isLogedIn() {
    return this._isLogedIn;
  }
  set isActivated(isActivated) {
    this._isActivated = isActivated;
  }
  get isActivated() {
    return this._isActivated;
  }
  set route(route) {
    this._route = route;
  }
  get route() {
    return this._route;
  }
}

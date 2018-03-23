export default class Store {
  constructor(service) {
    this.service = service;
  }
  static create(service){
    return new Store(service);
  }
  commit(key){
    this.service.onCommit(key);
  }
}

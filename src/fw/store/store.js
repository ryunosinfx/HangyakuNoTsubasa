export default class Store {
  constructor(service) {
    this.service = service;
  }
  update(service){
    this.service = service;
  }
  commit(key){
    this.service.onCommit(key);
  }
}

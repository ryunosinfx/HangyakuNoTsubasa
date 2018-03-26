cosnt storeImple = new Store(null);
export default class StoreFactory {
  static getStore(service){
    storeImples.update(service);
    return storeImples;
  }
}

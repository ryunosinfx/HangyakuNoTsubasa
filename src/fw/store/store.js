import ObjectUtil from '../util/objectUtil';

const mainHolder = new Map();
const mainKey = 'aaa';
export default class Store {
  constructor(service) {
  }
  static getStore(key) {
    const newKey = key ? key : mainKey;
    let store = mainHolder.has(newKey) ? mainHolder.get(newKey) : null;
    let clonedStore = store ? ObjectUtil.simpleDeepClone(store) : null;
    return clonedStore;
  }
  static setStore(store, key) {
    const newKey = key ? key : mainKey;
    let clonedStore = store ? ObjectUtil.simpleDeepClone(store) : null;
    mainHolder.set(newKey, clonedStore);
  }
}

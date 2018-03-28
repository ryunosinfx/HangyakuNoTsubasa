import Store from '../store/store';

const actionMap = new Map();
export default class ActionDispatcherImple {
  constructor(page) {
    this.page = page;
  }

  static add(action, reducer) {
    const type = action.type;
    if (!type) {
      return false;
    }
    if (actionMap.has(type)) {
      const reducers = actionMap.get(type);
      if (!reducers.includes(reducer)) {
        reducers.push(reducers);
      } else {
        return false;
      }
    } else {
      actionMap.set(type, [reducer]);
    }
    return true;
  }

  static remove(action) {
    const type = action.type;
    if (!type) {
      return false;
    }
    if (actionMap.has(type)) {
      const reducers = actionMap.get(type);
      if (!reducers.includes(reducer)) {
        const index = reducers.indexof(reducer);
        reducers.splice(index, 1)
      } else {
        return false;
      }
    }
    return true;
  }

  async dispatch(action) {
    const type = action.type;

    if (!type) {
      return false;
    }
    const storeKey = action.storeKey;
    let store = Store.getStore(storeKey);
    if (actionMap.has(type)) {
      const reducers = actionMap.get(type);
      for (let reducer of reducers) {
        store = await reducer.reduce(store, action);
      }
      Store.setStore(store);
    }
    store = Store.getStore(storeKey);
    this.page.update(store);
    return true;
  }
}

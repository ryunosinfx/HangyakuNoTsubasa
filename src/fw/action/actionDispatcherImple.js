import Store from '../store/store';

const actionMap = new Map();
export default class ActionDispatcherImple {
  constructor(page) {
    this.page = page;
  }

  static add(action, reducer) {
    console.log('ActionDispatcherImple add00'+action);
  if (!action) {
    return false;
  }

  console.log('ActionDispatcherImple add01'+action.type);
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

    console.log('dispatch00 type='+type+'/action='+JSON.stringify(action));
    if (!type) {
      return false;
    }
    const storeKey = action.storeKey;
    let store = Store.getStore(storeKey);
    let targetPage = this.page;
    console.log('dispatch01');
    if (actionMap.has(type)) {
      const reducers = actionMap.get(type);
      for (let reducer of reducers) {
        store = await reducer.preReduce(store, action);
        store = await reducer.reduce(store, action);
        store = await reducer.postReduce(store, action);
      }
      Store.setStore(store);
    }
    console.log('dispatch02');
    if (store.isOrverride) {
      targetPage = action.data.page;
      if (this.page.onPageHide(nextPage, data) === false) {
        return;
      };
      targetPage.update(store);
      this.page.onPageHidden(targetPage, data);
    } else {
      targetPage.update(store);
    }
    store = Store.getStore(storeKey);

    return true;
  }
}

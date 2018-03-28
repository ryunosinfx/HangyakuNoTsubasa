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
        const index= reducers.indexof(reducer);
        reducers.splice(index, 1)
      } else {
        return false;
      }
    }
    return true;
  }

  call(action) {
    const type = action.type;
    
    if (!type) {
      return false;
    }
    if (actionMap.has(type)) {
      const reducers = actionMap.get(type);
      for (let handler of reducers) {
        reducers(action);
      }
    }
    return true;
  }
}

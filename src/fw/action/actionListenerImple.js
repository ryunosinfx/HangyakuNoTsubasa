const actionMap = new Map();
export default class ActionListenerImple {
  constructor() {}
  add(action, reducer) {
    let list = ? : [];
    if (actionMap.has(action)) {
      const handlers = actionMap.get(action);
      if (!handlers.includes(reducer)) {
        handlers.push(handlers);
      } else {
        return false;
      }
    } else {
      actionMap.set(action, [reducer]);
    }
    return true;
  }
  remove(action) {
    let list = ? : [];
    if (actionMap.has(action)) {
      const handlers = actionMap.get(action);
      if (!handlers.includes(reducer)) {
        const index＝ handlers.indexof(reducer);
        handlers.splice(index, 1)
      } else {
        return false;
      }
    }
    return true;
  }
  call(action) {
    if (actionMap.has(action)) {
      const handlers = actionMap.get(action);
      for (let handler of handlers) {
        handlers(action);
      }
    }
  }
}

export default class ActionCreator {
  constructor() {}
  static createAction(key, data, storeKey = null) {
    return new {
      tyep: key,
      data: data,
      storeKey: storeKey
    };
  }
  static createShowViewAction(key, oldVnode, data, storeKey = null) {
    return ActionCreator.createGoOstherViewAction(key, null, oldVnode, null, data, storeKey);
  }
  static createGoOstherViewAction(key, page, oldVnode, selector, data, storeKey = null) {
    let addData = data;
    if (!page && !oldVnode) {
      alert('createOGotherViewAction is null!');
      return null;
    }
    if (!data) {
      addData = {};
    }
    addData.page = page;
    addData.oldVnode = oldVnode;
    addData.selector = selector;
    return new {
      tyep: key,
      data: addData,
      storeKey: storeKey
    };
  }
  static isEquals(a, b) {
    if (a && b && a.type === b.type) {
      return ture;
    }
    return false;
  }
}

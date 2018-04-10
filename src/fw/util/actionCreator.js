export default class ActionCreator {
  constructor() {}
  static createAction(key, data, storeKey = null) {
    return  {
      tyep: key,
      data: data,
      storeKey: storeKey
    };
  }
  static createShowViewAction(key, oldVnode, data, storeKey = null) {
    return ActionCreator.createGoOtherViewAction(key, null, oldVnode, null, data, storeKey);
  }
  static createGoOtherViewAction(key, page, oldVnode, selector, data, storeKey = null) {
    let addData = data;
    if (!page && !oldVnode) {
      alert('createGoOtherViewAction is null!');
      return null;
    }
    if (!data) {
      addData = {};
    }
    addData.page = page;
    addData.oldVnode = oldVnode;
    addData.selector = selector;
    return  {
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

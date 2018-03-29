
export default class ActionCreator {
  constructor() {
  }
  static createAction(key ,data,storeKey = null){
    return new {tyep:key,data:data,storeKey:storeKey};
  }
}


export default class ActionCreator {
  constructor() {
  }
  static createAction(key ,data,storeKey = null){
    return new {tyep:key,data:data,storeKey:storeKey};
  }
  static isEquals(a, b){
    if(a && b && a.type=== b.type){
      return ture;
    }
    return false;
  }
}

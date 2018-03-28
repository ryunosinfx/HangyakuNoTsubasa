
export default class ActionCreator {
  constructor() {
  }
  static createAction(key ,data){
    return new {tyep:key,data:data,storeKey:null};
  }
}

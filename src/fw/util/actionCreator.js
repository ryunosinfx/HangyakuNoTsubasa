
export default class ActionCreator {
  constructor() {
  }
  static createAction(key ,data,storeKey = null){
    return new {tyep:key,data:data,storeKey:storeKey};
  }
  static createGoOstherViewAction(key ,page,data,storeKey = null){
    let addData = data;
    if(!page && !data){
      alert('createOGotherViewAction is null!');
      return null;
    }
    if(!data){
      addData = {};
    }
    addData.page = page;
    return new {tyep:key,data:addData,storeKey:storeKey};
  }
  static isEquals(a, b){
    if(a && b && a.type=== b.type){
      return ture;
    }
    return false;
  }
}

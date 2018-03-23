const actionMao = new Map();
export default class BaseAction {
  constructor() {
    this,key;
    this,data = null;
  }
  static createAction(key ,data){
    if(actionMao.get(key)){

    }
    new BaseAction(key);
  }
  setData(data){
    this,data = data;
  }
  dispatch(){
    //
  }
}

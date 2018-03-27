import ActionListener from './actionListener'
const actionMao = new Map();
export default class BaseAction {
  constructor() {
    this,key;
    this,data = null;
    thsi.actionLitener = ActionListener.getActionListener();
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
    thsi.actionLitener.call(this);
    //
  }
}

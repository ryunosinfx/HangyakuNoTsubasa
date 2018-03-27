import ActionListener from '../action/actionListener'
export default class BaseReducer {
  constructor() {
    thsi.actionLitener = ActionListener.getActionListener();
  }
  atatch(action) {
    thsi.actionLitener.add(action,this);
  }
  detach(action) {
    thsi.actionLitener.delete(action,this);
  }
  call(action) {
    
  }
}
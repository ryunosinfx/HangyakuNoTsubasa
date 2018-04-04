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
  async preReduce(store,action) {
    store.isOrverride = false;
    return store;
  }
  async reduce(store,action) {
    return store;
  }
  async postReduce(store,action) {
    return store;
  }
}

import ViewBaseActions from '../action/viewBaseActions'
import BaseReducer from './baseReducer'
export default class ViewBaseReducer extends BaseReducer {
  constructor() {
    this.add(ViewBaseActions.getGotoAnotherPageAction());
  }
  async reduce(store,action) {
    return store;
  }
}

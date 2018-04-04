import ViewBaseActions from '../action/viewBaseActions'
import ActionCreator from '../util/actionCreator'
import BaseReducer from './baseReducer'
export default class ViewBaseReducer extends BaseReducer {
  constructor() {
    this.add(ViewBaseActions.getGotoAnotherPageAction());
  }
  async reduce(store,action) {
    if(ActionCreator.isEquals(ViewBaseActions.getGotoAnotherPageAction(),action)){

    }else if(ActionCreator.isEquals(ViewBaseActions.getShowPageAction(),action)){

    }
    return store;
  }
}

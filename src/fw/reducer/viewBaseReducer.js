import ViewBaseActions from '../action/viewBaseActions'
import ActionCreator from '../util/actionCreator'
import BaseReducer from './baseReducer'
export default class ViewBaseReducer extends BaseReducer {
  constructor() {
    super();
    console.log('ViewBaseReducer 01');
    this.atatch(ViewBaseActions.getGotoAnotherViewAction());
    console.log('ViewBaseReducer 02');
    this.atatch(ViewBaseActions.getShowViewAction());
    console.log('ViewBaseReducer 03');
  }
  async reduce(store,action) {
    console.log('reduce! action:'+action);
    console.log('reduce! oldVnode:'+action.data.oldVnode);
    if(ActionCreator.isEquals(ViewBaseActions.getGotoAnotherViewAction(),action)){
      // todo update menue
      console.log('getGotoAnotherViewAction!');
    }else if(ActionCreator.isEquals(ViewBaseActions.getShowViewAction(),action)){
      store.isOrverride=true;

      store.oldVnode=action.data.oldVnode;
      store.selector=action.data.selector;
    }
    console.log('reduced...');
    return store;
  }
}
const viewBaseReducer = new ViewBaseReducer();

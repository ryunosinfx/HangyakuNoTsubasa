import ViewBaseActions from '../action/viewBaseActions'
import ActionCreator from '../util/actionCreator'
import BaseReducer from './baseReducer'
export default class ViewBaseReducer extends BaseReducer {
  constructor() {
    super();
    this.atatch(ViewBaseActions.getGotoAnotherPageAction());
    this.atatch(ViewBaseActions.getShowPageAction());
  }
  async reduce(store,action) {
    alert('reduce!');
    if(ActionCreator.isEquals(ViewBaseActions.getGotoAnotherPageAction(),action)){

    }else if(ActionCreator.isEquals(ViewBaseActions.getShowPageAction(),action)){
      store.isOrverride=true;

      store.oldVnode=action.data.oldVnode;
      tore.selector=action.data.selector;
    }
    alert('aaaaaa');
    return store;
  }
}
const viewBaseReducer = new ViewBaseReducer();

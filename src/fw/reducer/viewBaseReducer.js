import ViewBaseActions from '../action/viewBaseActions'
import ActionCreator from '../util/actionCreator'
import BaseReducer from './baseReducer'
export default class ViewBaseReducer extends BaseReducer {
  constructor() {
    super();
    console.log('ViewBaseReducer 01');
    this.atatch(ViewBaseActions.getGotoAnotherPageAction());
    console.log('ViewBaseReducer 02');
    this.atatch(ViewBaseActions.getShowPageAction());
    console.log('ViewBaseReducer 03');
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

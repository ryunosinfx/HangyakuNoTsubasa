import ActionCreator from '../util/actionCreator'
export default class ViewBaseActions {
  constructor() {
  }
  static getGotoAnotherViewAction(view, selector, data){
    if(!view){
      alert('getGotoAnotherViewAction view:'+view);
    }
    return ActionCreator.createGoOtherViewAction('GotoAnotherView',view,null, selector, data);
  }
  static getShowViewAction(oldVnode, selector, data){
    if(!oldVnode){
      alert('getShowViewAction oldVnode:'+oldVnode);
    }
    return ActionCreator.createShowViewAction('ShowView',oldVnode, selector, data);
  }
}

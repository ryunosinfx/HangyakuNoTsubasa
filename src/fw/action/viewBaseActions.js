import ActionCreator from '../util/actionCreator'
export default class ViewBaseActions {
  constructor() {
  }
  static getGotoAnotherViewAction(view, selector, data){
    if(!view){
      console.log('getGotoAnotherViewAction view:'+view);
    }
    return ActionCreator.createGoOtherViewAction('GotoAnotherView',view,null, selector, data);
  }
  static getShowViewAction(oldVnode, selector, data){
    if(!oldVnode){
      console.log('getShowViewAction oldVnode:'+oldVnode);
    }
    return ActionCreator.createShowViewAction('ShowView',oldVnode, selector, data);
  }
}

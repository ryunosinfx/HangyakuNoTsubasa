import ActionCreator from '../util/actionCreator'
export default class ViewBaseActions {
  constructor() {
  }
  static getGotoAnotherPageAction(page, selector, data){
    if(!page){
      alert('getGotoAnotherPageAction page:'+page);
    }
    return ActionCreator.createGoOtherViewAction('GotoAnotherPage',page,null, selector, data);
  }
  static getShowPageAction(oldVnode, selector, data){
    if(!oldVnode){
      alert('getShowPageAction oldVnode:'+oldVnode);
    }
    return ActionCreator.createShowViewAction('ShowPage',oldVnode, selector, data);
  }
}

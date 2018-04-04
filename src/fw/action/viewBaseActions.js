import ActionCreator from '../util/actionCreator'
export default class VsiewBaseActions {
  constructor() {
  }
  static getGotoAnotherPageAction(page){
    if(!page){
      alert('getGotoAnotherPageAction page:'+page);
    }
    return ActionCreator.cretate('GotoAnotherPage',{page:page});
  }
  static getShowPageAction(oldVnode){
    if(!page){
      alert('getShowPageAction oldVnode:'+oldVnode);
    }
    return ActionCreator.cretate('ShowPage',{oldVnode:oldVnode})
  }
}

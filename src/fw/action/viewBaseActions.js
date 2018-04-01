import ActionCreator from '../util/actionCreator'
export default class VsiewBaseActions {
  constructor() {
  }
  static getGotoAnotherPageAction(page){
    return ActionCreator.cretate('GotoAnotherPage',{page;page})
  }
  static getShowPageAction(){
    return ActionCreator.cretate('ShowPage',{})
  }
}

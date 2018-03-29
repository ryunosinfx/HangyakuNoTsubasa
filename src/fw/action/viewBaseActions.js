import ActionCreator from '../util/actionCreator'
export default class VsiewBaseActions {
  constructor() {
  }
  static getGotoAnotherPageAction(){
    return ActionCreator.cretate('GotoAnotherPage',{})
  }
  static getShowPageAction(){
    return ActionCreator.cretate('ShowPage',{})
  }
}

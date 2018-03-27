import ActionDispatcherImple from './actionDispatcherImple'
const actionDispacherMap = new Map();
export default class ActionDispatcher {
  constructor() {
  }
  static create(page){
    actionDispacherMap.set(page);
    return new ActionDispatcherImple(page);
  }
}

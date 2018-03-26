const actionListenerImple = new ActionListenerImple();
export default class ActionListener {
  constructor() {
  }
  static getActionListener(){
    return actionListenerImple;
  }
}

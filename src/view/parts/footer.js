import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
export default class Footer extends BaseView {
  constructor() {
    super.constructor();
    this.currentVnode = null;
  }
  show(node,viewState){
    if(node!==null && this.currentVnode===null){
      patch(node,)
    }
      return this.currentVnode;
  }
  crateVnode(viewState){
    let newVnode = null;
    return newVnode;
  }
  add(view){}
}

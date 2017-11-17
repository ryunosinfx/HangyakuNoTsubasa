import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
export default class Footer extends BaseView {
  constructor() {
    super.constructor();
    this.currentVnode = null;
  }
  show(node, viewState) {
    let newNode = this.crateVnode(,nodeviewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    }else{
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
    return this.currentVnode;
  }
  crateVnode(oldNode, viewState) {
    let newVnode = null;
    return newVnode;
  }
}

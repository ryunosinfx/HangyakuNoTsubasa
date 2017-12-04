import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import css from './css'
export default class Header extends BaseView {
    constructor() {
      super();
      this.currentVnode = null;
    }
    show(node, viewState) {
      let newNode = this.crateVnode(node,viewState);
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

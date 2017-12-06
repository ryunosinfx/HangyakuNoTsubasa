import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Manager extends BaseView {
  constructor() {
    super('Manager','Manager');
    this.currentVnode = null;
  }
  show(node, viewState) {
    let newNode = this.crateVnode(node, viewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
  }

  crateVnode(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#a00'
      }
    }, [h('h1', 'i am Manager!')]);
    return newVnode;
  }
}

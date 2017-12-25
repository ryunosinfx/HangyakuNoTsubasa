import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Viewer extends BaseView {
  constructor() {
    super('Viewer','Viewer');
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
        color: '#00a'
      }
    }, [h('h1', 'i am Viewer!')]);
    return newVnode;
  }
}

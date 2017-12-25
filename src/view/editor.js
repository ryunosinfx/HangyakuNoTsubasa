import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Editor extends BaseView {
  constructor() {
    super('Editor','Editor');
  }
  show(node, viewState) {
    let newNode = this.crateVnode( viewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
  }

  crateVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#990'
      }
    }, [h('h1', 'i am Editor!')]);
    return newVnode;
  }
  load(key) {}
  save() {}
  undo() {}
  redo() {}
  record() {}
}

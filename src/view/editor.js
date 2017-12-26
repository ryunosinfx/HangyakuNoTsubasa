import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Editor extends BaseView {
  constructor() {
    super('Editor','Editor');
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

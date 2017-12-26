import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Manager extends BaseView {
  constructor() {
    super('Manager','Manager');
  }

  crateVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#a00'
      }
    }, [h('h1', 'i am Manager!')]);
    return newVnode;
  }
}

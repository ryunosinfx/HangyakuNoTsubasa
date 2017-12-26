import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Searcher extends BaseView {
  constructor() {
    super('Searcher','Searcher');
  }

  crateVnode(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#0a0'
      }
    }, [h('h1', 'i am Search!')]);
    return newVnode;
  }
}

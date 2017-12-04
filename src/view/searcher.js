import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Searcher extends BaseView {
  constructor() {
    super();
    this.currentVnode = '';
  }
  show(){
    return this.currentVnode;
  }
}

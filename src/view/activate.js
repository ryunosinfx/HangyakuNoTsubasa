import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Activate extends BaseView {
  constructor() {
    super();
    this.currentVnode = '';
  }
  show(){
    return this.currentVnode;
  }
  async activste(){

  }
}

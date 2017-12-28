import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Register extends BaseView {
  constructor() {
    super('Register','Register');
  }
  crateVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#909'
      }
    }, [
      h('h1', 'i am Register!'),
        h('div', 'i am Register!'),
    ]);
    return newVnode;
  }
  async activste() {}
}

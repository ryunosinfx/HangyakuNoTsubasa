import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Activate extends BaseView {
  constructor(service) {
    super(service, 'Activate','Activate');
  }
  crateVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [h('h1', 'i am Activate!')]);
    return newVnode;
  }
  async activste() {}
}

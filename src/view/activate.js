import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Activate extends BaseView {
  constructor() {
    super('Activate','Activate');
  }
  show(node, viewState) {
    let newNode = this.crateVnode(viewState);
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
        color: '#099'
      }
    }, [h('h1', 'i am Activate!')]);
    return newVnode;
  }
  async activste() {}
}

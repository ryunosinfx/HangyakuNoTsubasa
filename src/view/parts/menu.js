import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor() {
    super.constructor();
    this.currentVnode = null;
  }
  show(node, viewState) {
    let newNode = this.crateVnode(, nodeviewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
    return this.currentVnode;
  }
  crateVnode(oldNode, viewState) {
    let newVnode = h('div', {
        style: {
          color: '#000'
        }
      }, [
        h('h1', 'i am menue'),
        h('ul', ['li',{style:css.menu.item},h('a',)]),
      ]);;
    return newVnode;
  }
}

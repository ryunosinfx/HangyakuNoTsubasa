import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor() {
    super();
    this.currentVnode = null;
  }
  show(node, viewState) {
    let newNode = this.crateVnode(node, viewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
    return this.currentVnode;
  }
  crateVnode(oldNode, viewState) {
    let liNides = [];
    for (let value of[
      {
        href : 'constant',
        name: ''
      }
    ]) {
      liNides.push(this.createMenuItem(value));
    }
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am menue'),
      h('ul', liNides)
    ]);
    return newVnode;
  }
  createMenuItem(data) {
    return h('li', {
      style: css.menu.item
    }, h('a', {href : data.href}, data.name));
  }
}

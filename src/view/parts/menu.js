import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor() {
    super();
    this.currentVnode = null;
    this.menuPageList = [];
  }
  init(data){
    this.menuPageList = data;
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
    let liNides = this.createMenuLink();
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
  createMenuLink(){
    let liNides = [];
    for (let value of this.menuPageList) {
      liNides.push(this.createMenuItem(value));
    }
    return liNides;
  }
  createMenuItem(data) {
    return h('li', {
      style: css.menu.item
    }, h('a', {href : data.getHref()}, data.getName()));
  }
}

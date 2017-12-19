import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import css from './css'
export default class Footer extends BaseView {
  constructor(layoutView) {
    super();
    this.layoutView = layoutView;
    this.currentVnode = null;
  }
  show(node, viewState) {
    let newNode = this.crateVnode(node,viewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    }else{
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
      h('h1', 'i am footer!!')
    ]);
    return newVnode;
  }
}

import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
export default class Header extends BaseView {
  constructor(view) {
    super.constructor();
    this.view = view;
    this.currentVnode = '';
  }
  show(){
      return this.currentVnode;
  }
  add(view){}
}

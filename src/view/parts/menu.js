import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
export default class Menue extends BaseView {
  constructor() {
    super.constructor();
    this.currentVnode = '';
  }
  show(){
      return this.currentVnode;
  }
  add(view){}
}

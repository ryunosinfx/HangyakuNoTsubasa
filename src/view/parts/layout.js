import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import Header from './header'
import Footer from './footer'
import Menue from './menu'
export default class Layout extends BaseView {
  constructor() {
    super.constructor();
    super.header = new Header();
    super.footer = new Footer();
    super.menu = new Menue();
    this.baseFrame = null;
    this.currentVnode = '';
  }
  show(page) {

  }
  add(view) {}
  createBsaeFrame() {

  }
}

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
    this.header = new Header();
    this.footer = new Footer();
    this.menu = new Menue();
    this.baseFrame = null;
    this.currentVnode = '';
  }
  init() {
    let elements = document.getElementsByTagName("body");
    let layout = document.createNode('div');
    elements[0].innerHTML = this.createBsaeFrame();
    // build frme
  }
  // from service
  show(page) {

  }
  add(view) {}
  createBsaeFrame() {
    return '<h1>Hellow!</h1><div id="c2"></div><div id="container"></div>';
  }
}

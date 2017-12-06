import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../baseView'
import Header from './header'
import Footer from './footer'
import Menue from './menu'
import css from './css'
export default class Layout extends BaseView {
  constructor(menuPageList = []) {
    super();
    this.header = new Header();
    this.footer = new Footer();
    this.menu = new Menue();
    this.baseFrame = null;
    this.currentVnode = '';
    this.menu.init(menuPageList);
  }
  init(currentVnode) {
    alert(currentVnode);
    this.currentVnode = currentVnode;
    let elements = document.getElementsByTagName("body");
    //let layout = document.createNode('div');
    elements[0].innerHTML = this.createBsaeFrame();
    // build frme
    let header = document.getElementById("header");
    let footer = document.getElementById("footer");
    let menu = document.getElementById("menu");
    let content = document.getElementById("content");
    this.header.show(header);
    this.footer.show(footer);
    this.menu.show(menu);
    this.currentVnode.show(content);
  }
  // from service
  show(page) {

  }
  add(view) {}
  createBsaeFrame() {
    return '<header id="header">Hellow!</header><div id="menu"></div><div id="container"><div id="content"></div></div><footer id="footer"></footer>';
  }
}

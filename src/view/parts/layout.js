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
  constructor(service) {
    super(service);
    this.header = new Header(service,this);
    this.footer = new Footer(service,this);
    this.menu = new Menue(service,this);
    this.baseFrame = null;
    this.currentVnode = '';
  }
  setMenuList(menuPageList = []) {
    this.menu.init(menuPageList);
  }
  init(currentVnode, state) {
    this.header.setRouter(this.router);
    this.footer.setRouter(this.router);
    this.menu.setRouter(this.router);
    //alert(currentVnode);
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
    let oldVnode = this.currentVnode;
    this.currentVnode = page;
    oldVnode.goAnotherPage(page);
  }
  add(view) {}
  createBsaeFrame() {
    return '<header id="header">Hellow!</header><div id="menu"></div><div id="container"><div id="content"></div></div><footer id="footer"></footer>';
  }
}

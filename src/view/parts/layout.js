import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import Header from './header'
import Footer from './footer'
import Menue from './menu'
import css from './css'
export default class Layout extends BaseView {
  constructor(service) {
    super(service);
  }
  initialize() {
    this.router = this.service.getRouter();
    this.header = new Header(this.service, this);
    this.footer = new Footer(this.service, this);
    this.menu = new Menue(this.service, this);
    this.baseFrame = null;
    this.page = '';
  }
  setMenuList(menuPageList = []) {
    this.menu.init(menuPageList);
  }
  init(page, state) {
    //alert(currentVnode);
    this.page = page;
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
    this.page.show(content);
  }
  // from service
  show(page, viewState, data) {
    let oldPage = this.page;
    this.page = page;
    oldPage.goAnotherPage(page, viewState, data);
  }
  add(view) {}
  createBsaeFrame() {
    return '<header id="header">Hellow!</header><div id="menu"></div><div id="container"><div id="content"></div></div><footer id="footer"></footer>';
  }
}

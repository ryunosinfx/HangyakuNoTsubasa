import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../../fw/view/baseView'
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
    this.view = '';
  }
  setMenuList(menuViewList = []) {
    this.menu.init(menuViewList);
  }
  init(view, state) {
    //alert(currentVnode);
    this.view = view;
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
    this.view.show(content);
  }
  // from service
  show(view, viewState, data) {
    let oldView = this.view;
    this.view = view;
    oldView.goAnotherView(view, viewState, data);
  }
  add(view) {}
  createBsaeFrame() {
    return '<header id="header">Hellow!</header><div id="menu"></div><div id="container"><div id="content"></div></div><footer id="footer"></footer>';
  }
}

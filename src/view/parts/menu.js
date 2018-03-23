import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor(service, layoutView) {
    super(service);
    this.layoutView = layoutView;
    this.currentVnode = null;
    this.menuPageList = [];
    this.layout = [];
  }
  init(data) {
    this.menuPageList = data;
  }
  rendarer(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am menue'),
      h('ul#menueList', 'init menu!')
    ]);
    return newVnode;
  }
  onPageShow(viewState, data) {
    const state = this.getCurrentState();
    this.prePatch("#menueList", this.createMenuLink(state));
  }
  createMenuLink(state) {
    let liNides = [];
    for (let value of this.menuPageList) {
      let menuItem = this.createMenuItem(value,state);
      if (menuItem) {
        liNides.push(menuItem);
      }
    }
    return h('ul#menueList', liNides);
  }
  createMenuItem(page,state) {
    console.log('------------------createMenuItem:'+state+'/page.isAccessable(state):'+page.isAccessable(state)+'/name:'+page.getName());
    if(!!page.isAccessable(state) === false){
      return null;
    }
    let self = this;
    return h('li', {
      style: css.menu.item
    }, h('a', {
      on: {
        click: self.router.getGoNextEventhandler(page)
      }
    }, page.getName()));
  }
}

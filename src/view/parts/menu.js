import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../../fw/view/baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor(service, layoutView) {
    super(service,'Menue','Menue');
    this.layoutView = layoutView;
    this.currentVnode = null;
    this.menuViewList = [];
    this.layout = [];
  }
  init(data) {
    this.menuViewList = data;
  }
  render(viewState) {
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
  onViewShow(viewState, data) {
    const state = this.getCurrentState();
    this.prePatch("#menueList", this.createMenuLink(state));
  }
  createMenuLink(state) {
    let liNides = [];
    for (let value of this.menuViewList) {
      let menuItem = this.createMenuItem(value,state);
      if (menuItem) {
        liNides.push(menuItem);
      }
    }
    return h('ul#menueList', liNides);
  }
  createMenuItem(view,state) {
    console.log('------------------createMenuItem:'+state+'/view.isAccessable(state):'+view.isAccessable(state)+'/name:'+view.getName());
    if(!!view.isAccessable(state) === false){
      return null;
    }
    let self = this;
    return h('li', {
      style: css.menu.item
    }, h('a', {
      on: {
        click: self.router.getGoNextEventhandler(view)
      }
    }, view.getName()));
  }
}

import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import css from './css'
export default class Menue extends BaseView {
  constructor(service,layoutView) {
    super(service);
    this.layoutView = layoutView;
    this.currentVnode = null;
    this.menuPageList = [];
    this.layout = [];
  }
  init(data){
    this.menuPageList = data;
  }
  createVnode(viewState) {
    let liNides = this.createMenuLink();
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am menue'),
      h('ul', liNides)
    ]);
    return newVnode;
  }
  createMenuLink(){
    let liNides = [];
    for (let value of this.menuPageList) {
      liNides.push(this.createMenuItem(value));
    }
    return liNides;
  }
  createMenuItem(data) {
    let self = this;
    return h('li', {
      style: css.menu.item
    }, h('a',{
    on: {
        click: self.router.getGoNextEventhandler(data)
      }}, data.getName()));
  }
}

import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

export default class BaseView {
  constructor(name, key) {
    this.name  = name;
    this.key = key;
    this.filter = (state) => {
      return true
    }
    this.router = null;
    this.currentVnode = null;
    console.log('name='+name+'/key:'+key);
  }
  show(page) {

  }
  goAnotherPage(page,viewState) {
    let newNode = page.getViewNode();
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;

  }
  crateVnode(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [h('h1', 'i am '+this.name +'!')]);
    return newVnode;
  }
  isEquals(baseView) {
    return baseView, name === this, name;
  }
  getKey() {
    return this.key;
  }
  getFilter() {
    return this.filter;
  }
  getName() {
    return this.name;
  }
  getHref() {
    let href = location.href.split(/\?/)[0]+'?'+this.key;
    console.log('href='+href);
    return href;
  }
  getViewNode(){
    return this.currentVnode == null ? this.crateVnode(node, viewState):this.currentVnode;
  }
  setRouter(router){
    this.router = router
  }
}

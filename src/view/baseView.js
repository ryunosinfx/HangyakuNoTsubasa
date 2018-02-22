import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

import ElementSelector from '../util/elementSelector'
export default class BaseView {
  constructor(service, name, key) {

    this.name = name;
    this.key = key;
    this.es = new ElementSelector();
    this.filter = (state) => {
      return true
    }
    this.service = service;
    this.router = this.service.getRouter();
    this.currentVnode = null; //this.crateVnode(null);
    this.viewState = null; //this.crateVnode(null);
    //console.log('name=' + name + '/key:' + key);
  }
  refresh(viewState,data) {
    let newNode = this.crateVnode(viewState,data);
    patch(this.currentVnode, newNode);
    this.currentVnode = newNode;
    this.viewState = viewState;
  }
  patch(currenVnode, newVnode) {
    alert(patch(currenVnode, newVnode));
  }

  refreshView(viewState,data) {
    this.refresh(viewState,data)
  }
  show(node, viewState, data) {
    //console.log('A01 baseView.goAnotherPage page;' + this.getName());
    let newNode = this.currentVnode === null ? this.crateVnode(viewState) : this.currentVnode;
    alert("node:"+node+"/this.currentVnode:"+this.currentVnode+ '/newNode:'+newNode);
  //  this.refreshView(viewState,data) ;
    if (node !== null) {
      patch(node, newNode);
    } else {
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
    this.viewState = viewState;
  }
  goAnotherPage(page, viewState) {
    //console.log('A00 baseView.goAnotherPage page;' + page.getName() + '/this.name:' + this.name + '/current:' + this.currentVnode);
    //console.log('A02 baseView.goAnotherPage page;' + page.getName());
    page.show(this.currentVnode, viewState);

  }
  crateVnode(viewStatev,data) {
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [h('h1', 'i am ' + this.name + '!')]);
    //console.log('baseView.crateVnode');
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
    let href = location.href.split(/\?/)[0] + '?' + this.key;
    console.log('href=' + href);
    return href;
  }
  getViewNode(viewState) {
    console.log('baseView.getViewNode this.name:' + this.name);
    return this.currentVnode === null ? this.crateVnode(viewState) : this.currentVnode;
  }
  async geToAnotherPage(key, data) {
    return await this.service.geToAnotherPage(this.currentVnode, key, data);
  }
  async goBack(data) {
    return await this.service.geToAnotherPage(this.currentVnode, key, data);
  }
}

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
    this.patch(this.currentVnode.elm, newNode);
    this.viewState = viewState;
  }
  patch(currentVnode, selector,newVnode) {
    //alert('patch currentVnode:'+(currentVnode.elm? currentVnode.elm.id :currentVnode.elm )+'/!!currentVnode.elm:'+(!!currentVnode.elmss));
    // !!currentVnode.elm? currentVnode.elm: parentNode
    let result = this.es.patch(currentVnode, selector, newVnode);
    //result = newVnode;
    this.currentVnode = result;
    return result;
  }

  refreshView(viewState,data) {
    this.refresh(viewState,data)
  }
  show(node, viewState, data) {
    console.log('A01 baseView.goAnotherPage page;' + this.getName());
    let newNode = !this.currentVnode ? this.crateVnode(viewState) : this.currentVnode;
    console.log("show node:"+node+"/this.currentVnode:"+this.currentVnode+ '/newNode:'+newNode);
    if (node !== null) {
      this.patch(node, newNode);
    } else {
      this.patch(this.currentVnode, newNode);
    }
    this.viewState = viewState;
  }
  goAnotherPage(page, viewState, data) {
    //console.log('A00 baseView.goAnotherPage page;' + page.getName() + '/this.name:' + this.name + '/current:' + this.currentVnode);
    console.log('A02 baseView.goAnotherPage from '+ this.getName()+' to page;' + page.getName());
    page.show(this.currentVnode, viewState, data);
  }
  // Event listener
  onPageLoad(page, viewState, data){

  }
  onPageLoaded(page, viewState, data){

  }
  onPageShow(page, viewState, data){

  }
  onPageShown(page, viewState, data){

  }
  onPageHide(page, viewState, data){

  }
  onPageHidden(page, viewState, data){

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
    return !this.currentVnode ? this.crateVnode(viewState) : this.currentVnode;
  }
  async goToAnotherPage(key, data) {
    console.log('A03 baseView.goToAnotherPage key;' + key);
    return await this.service.goToAnotherPage(key, data);
  }
  async goBack(data) {
    return await this.service.goToAnotherPage(key, data);
  }
}

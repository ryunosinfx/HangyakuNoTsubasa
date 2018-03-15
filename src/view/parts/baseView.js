import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

import ElementSelector from '../../util/elementSelector'
export default class BaseView {
  constructor(service, name, key) {
    this.onPageLoad(service, name, key);
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
    this.onPageLoaded(service, name, key);
  }
  refresh(viewStateImput, data) {
    const viewState = viewStateImput ? viewStateImput : this.viewState;
    const newNode = this.crateVnode(viewState, data);
    this.patch(this.currentVnode, newNode);
    this.viewState = viewState;
  }
  patch(currentVnode, selector, newVnode) {
    const result = this.es.patch(currentVnode, selector, newVnode);
    this.currentVnode = result;
    return result;
  }
  prePatch(currentVnode, selector, newVnode){
    return this.es.prePatch(currentVnode, selector, newVnode);
  }

  refreshView(viewState, data) {
    this.refresh(viewState, data)
  }
  show(oldNode, viewStateImput, data) {
    let viewState = viewStateImput ? viewStateImput : this.viewState;
    this.onPageShow(oldNode, viewState, data);
    console.log('A01 baseView.goAnotherPage page;' + this.getName());
    let newNode = !this.currentVnode ? this.crateVnode(viewState) : this.currentVnode;
    this.onPageShow(newNode, viewState, data);
    console.log("show oldNode:" + oldNode + "/this.currentVnode:" + this.currentVnode + '/newNode:' + newNode);
    if (oldNode) {
      this.patch(oldNode, newNode);
    } else {
      this.patch(this.currentVnode, newNode);
    }
    this.onPageShown(newNode, viewState, data);
    this.viewState = viewState;
  }
  //
  goAnotherPage(page, viewStateImput, data, nextViewStateImput) {
    let viewState = viewStateImput ? viewStateImput : this.viewState;
    if (this.onPageHide(page, viewState, data) === false) {
      return;
    };
    //console.log('A00 baseView.goAnotherPage page;' + page.getName() + '/this.name:' + this.name + '/current:' + this.currentVnode);
    console.log('A02 baseView.goAnotherPage from ' + this.getName() + ' to page;' + page.getName());
    page.show(this.currentVnode, nextViewStateImput, data);
    this.onPageHidden(page, viewState, data)
    this.viewState = viewState;
  }
  // Event listener
  onPageLoad(service, name, key) {
    console.log('m001 baseView.onPageLoad service:' + service + '/name:' + name + '/key:' + key);
  }
  onPageLoaded(service, name, key) {
    console.log('m002 baseView.onPageLoaded service:' + service + '/name:' + name + '/key:' + key);

  }
  onPrePageBuild(oldNode, viewState, data) {
    console.log('m003a baseView.onPrePageBuild oldNode:' + oldNode + '/viewState:' + viewState + '/data:' + data);
  }
  onPageShow(newNode, viewState, data) {
    console.log('m003 baseView.onPageShow newNode:' + newNode + '/viewState:' + viewState + '/data:' + data);
  }
  onPageShown(newNode, viewState, data) {
    console.log('m004 baseView.onPageShown newNode:' + newNode + '/viewState:' + viewState + '/data:' + data);
  }
  onPageHide(page, viewState, data) {
    console.log('m005 baseView.onPageHide page:' + page + '/viewState:' + viewState + '/data:' + data);
    return true;
  }
  onPageHidden(page, viewState, data) {
    console.log('m006 baseView.onPageHidden page:' + page + '/viewState:' + viewState + '/data:' + data);
  }
  crateVnode(viewStatev, data) {
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
  update(action) {

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
  getCurrentState() {
    return this.service.store.get('state');
  }
}

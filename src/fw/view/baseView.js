import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

import ElementSelector from './elementSelector'
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
    this.viewState = null;
    this.currentVnode = null;//this.rendarer(this.viewState, null);
    //console.log('name=' + name + '/key:' + key);
    this.onPageLoaded(service, name, key);
  }
  isAccessable(state){
    return true;
  }
  update(action, data) {
    const viewState = this.viewState;
    const oldVnode = this.currentVnode;
    this.onPageShow(viewState, data);
    this.patch(oldVnodet, this.currentVnode);
    this.onPageShown(viewState, data);
    this.viewState = viewState;
  }
  patch(selector, newVnode) {
    return this.patchFromOtherVnode(this.currentVnode, selector, newVnode);
  }
  patchFromOtherVnode(currentVnode, selector, newVnode) {
    const result = this.es.patch(currentVnode, selector, newVnode);
    result.data['name']= this.name+Date.now();
    this.currentVnode = result;
    return result;
  }
  prePatch(selector, newVnode){
    this.currentVnode.data['name']= this.name+Date.now();
    this.currentVnode = this.es.prePatch(this.currentVnode, selector, newVnode);
    return this.currentVnode;
  }

  show(oldNode, viewStateImput, data) {
    let viewState = viewStateImput ? viewStateImput : this.viewState;
    this.onPrePageBuild(oldNode, viewState, data);
    console.log('A01 baseView.goAnotherPage page;' + this.getName());
    this.currentVnode = !this.currentVnode ? this.rendarer(viewState) : this.currentVnode;
    this.onPageShow(viewState, data);
    console.log("show oldNode:" + oldNode + "/this.currentVnode:" + this.currentVnode + '/newNode:' + this.currentVnode);
    if (oldNode) {
      this.patchFromOtherVnode(oldNode, this.currentVnode);
    } else {
      this.patchFromOtherVnode(this.currentVnode, this.currentVnode);
    }
    this.onPageShown(viewState, data);
    this.viewState = viewState;
  }
  //
  goAnotherPage(nextPage, viewStateImput, data, nextViewStateImput) {
    let viewState = viewStateImput ? viewStateImput : this.viewState;
    if (this.onPageHide(nextPage, viewState, data) === false) {
      return;
    };
    //console.log('A00 baseView.goAnotherPage page;' + page.getName() + '/this.name:' + this.name + '/current:' + this.currentVnode);
    console.log('A02 baseView.goAnotherPage from ' + this.getName() + ' to nextPage;' + nextPage.getName());
    nextPage.show(this.currentVnode, nextViewStateImput, data);
    this.onPageHidden(nextPage, viewState, data)
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
  onPageShow(viewState, data) {
    console.log('m003 baseView.onPageShow newNode:'  + '/viewState:' + viewState + '/data:' + data);
  }
  onPageShown(viewState, data) {
    console.log('m004 baseView.onPageShown newNode:'  + '/viewState:' + viewState + '/data:' + data);
      //console.log(JSON.stringify(this.currentVnode));
  }
  onPageHide(nextPage, viewState, data) {
    console.log('m005 baseView.onPageHide nextPage:' + nextPage + '/viewState:' + viewState + '/data:' + data);
      //console.log(JSON.stringify(this.currentVnode));
    return true;
  }
  onPageHidden(nextPage, viewState, data) {
    console.log('m006 baseView.onPageHidden nextPage:' + nextPage + '/viewState:' + viewState + '/data:' + data);
  }
  rendarer(viewStatev, data) {
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [h('h1', 'i am ' + this.name + '!')]);
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

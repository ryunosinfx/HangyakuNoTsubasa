import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

import ElementSelector from './elementSelector'
import ActionDispatcher from '../action/actionDispatcher'
import ViewBaseReducer from '../reducer/viewBaseReducer'
import ViewBaseActions from '../action/viewBaseActions'
import ActionCreator from '../util/actionCreator'
export default class BaseView {
  constructor(service, name, key) {
    this.dispatcher = ActionDispatcher.create(this);
    this.onViewLoad(service, name, key);
    this.name = name;
    this.key = key;
    this.es = new ElementSelector();
    this.filter = (state) => {
      return true
    }
    this.service = service;
    this.router = this.service.getRouter();
    this.viewState = null;
    this.currentVnode = null; //this.rendarer(this.viewState, null);
    //console.log('name=' + name + '/key:' + key);
    this.onViewLoaded(service, name, key);
  }
  isAccessable(state) {
    return true;
  }
  patch(selector, newVnode) {
    return this.patchFromOtherVnode(this.currentVnode, selector, newVnode);
  }
  patchFromOtherVnode(currentVnode, selector, newVnode) {
    const result = this.es.patch(currentVnode, selector, newVnode);
    result.data['name'] = this.name + Date.now();
    this.currentVnode = result;
    return result;
  }
  prePatch(selector, newVnode) {
    this.currentVnode.data['name'] = this.name + Date.now();
    this.currentVnode = this.es.prePatch(this.currentVnode, selector, newVnode);
    return this.currentVnode;
  }
  update(store) {
    const viewState = this.viewState;
    const oldVnode = store.oldVnode;
    const selector = store.selector;
    const isOrverride = store.isOrverride;
    const currentVnode = oldVnode ? oldVnode : this.currentVnode;

    console.log('A00 oldVnode:'+oldVnode+'/isOrverride='+isOrverride+'/selector='+selector+'/currentVnode:'+currentVnode);
    if (isOrverride) {
      this.onPreViewBuild(oldVnode, store);
      console.log('A01 baseView.goAnotherView view;' + this.getName());
      this.currentVnode = !this.currentVnode ? this.rendarer(store) : this.currentVnode;
    }
    this.onViewShow(viewState, store);
    if (isOrverride) {
      if (oldVnode) {
        this.patchFromOtherVnode(oldVnode, selector, this.currentVnode);
      } else {
        this.patchFromOtherVnode(this.currentVnode, this.currentVnode);
      }
    } else {
      this.patch(currentVnode, this.currentVnode);
    }
    this.onViewShown(viewState, store);
    this.viewState = viewState;
  }
  show(oldVnode, selector, store) {
    console.log('show oldVnode');
    console.log(oldVnode);
    let action = ViewBaseActions.getShowViewAction(oldVnode, selector, store);
    console.log(action);
    this.dispatcher.dispatch(action);
  }
  //
  goAnotherView(nextView, data) {
    // TODO dispatchaction
    if (this.onViewHide(nextView, data) === false) {
      return;
    };
    //console.log('A00 baseView.goAnotherView view;' + view.getName() + '/this.name:' + this.name + '/current:' + this.currentVnode);
    console.log('A02 baseView.goAnotherView from ' + this.getName() + ' to nextView;' + nextView.getName());
    nextView.show(this.currentVnode, data);
    this.onViewHidden(nextView, data)
  }
  // atache to
  atach(vnode,selector){
    this.show(oldVnode, selector);
  }
  detach(vnode,selector){

  }
  // Event listener
  onViewLoad(service, name, key) {
    console.log('m001 baseView.onViewLoad service:' + service + '/name:' + name + '/key:' + key);
  }
  onViewLoaded(service, name, key) {
    console.log('m002 baseView.onViewLoaded service:' + service + '/name:' + name + '/key:' + key);

  }
  onPreViewBuild(oldNode, data) {
    console.log('m003a baseView.onPreViewBuild oldNode:' + oldNode + '/data:' + data);
  }
  onViewShow(viewState, store) {
    console.log('m003 baseView.onViewShow newNode:' + '/store:' + store);
  }
  onViewShown(viewState, store) {
    console.log('m004 baseView.onViewShown newNode:' + '/store:' + store);
    //console.log(JSON.stringify(this.currentVnode));
  }
  onViewHide(nextView, data) {
    console.log('m005 baseView.onViewHide nextView:' + nextView + '/data:' + data);
    //console.log(JSON.stringify(this.currentVnode));
    return true;
  }
  onViewHidden(nextView, data) {
    console.log('m006 baseView.onViewHidden nextView:' + nextView + '/data:' + data);
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
  async goToAnotherView(key, data) {
    console.log('A03 baseView.goToAnotherView key;' + key);
    return await this.service.goToAnotherView(key, data);
  }
  async goBack(data) {
    return await this.service.goToAnotherView(key, data);
  }
  getCurrentState() {
    return this.service.store.get('state');
  }
}

import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

export default class BaseView {
  constructor(name, key) {
    this.name = name;
    this.key = key;
    this.filter = (state) => {
      return true
    }
    this.router = null;
    console.log('name='+name+'/key:'+key);
  }
  show(data) {

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
  setRouter(router){
    this.router = router
  }
}

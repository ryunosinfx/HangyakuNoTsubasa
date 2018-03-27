import Router from '../util/router'
import Layout from '../view/parts/layout'
import Store from './store/store'

export default class BaseServiceImpl {
  constructor(state) {
    const layout = new Layout(this);
    const router = new Router(layout);
    this.store = new Map();
    this.layout = layout;
    this.state = state;
    this.router = router;
    layout.initialize();
    this.layout.setMenuList(router.getMenuList());

  }

  registView(page){
    router.add(page);
  }

  async goToNext(key) {
    let page = this.router.getPage(state, key);
    page.show();
    return;
  }
  async goToAnotherPage(key, data) {
    this.store.set('state',this.state);
    let page = this.router.getPage(state, key);
    console.log('geToAnotherPage page:' + page.name + '/state:' + JSON.stringify(state) + '/data:' + JSON.stringify(data));
    this.layout.show(page, null, data);
    return;
  }
  async loadState() {
    let retState = this.state ? this.state : new State();
    retState.isLogiedIn = await ECIDBEMfunc.isLogedIn();
    this.state = retState;
    return retState;
  }
  getRouter() {
    return this.router;
  }
}

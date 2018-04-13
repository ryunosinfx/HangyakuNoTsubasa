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

  registView(view){
    router.add(view);
  }

  async goToNext(key) {
    let view = this.router.getView(state, key);
    view.show();
    return;
  }
  async goToAnotherView(key, data) {
    this.store.set('state',this.state);
    let view = this.router.getView(state, key);
    console.log('geToAnotherView view:' + view.name + '/state:' + JSON.stringify(state) + '/data:' + JSON.stringify(data));
    this.layout.show(view, null, data);
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

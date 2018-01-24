import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/searcher'
import Viewer from '../view/viewer'
import Register from '../view/register'
import Router from '../util/router'
import Layout from '../view/parts/layout'
import State from './state'

export default class ServiceImpl {
  constructor(state) {
    const layout = new Layout(this);
    const router = new Router(layout);
    this.layout = layout;
    this.state = state;
    this.router = router;
    layout.initialize();
    router.add(new Login(this), (state) => {
      return state.isLogiedIn === false
    });
    router.add(new Activate(this), (state) => {
      return state.isActivated === false
    });
    router.add(new Viewer(this), (state) => {
      return state.isLogiedIn
    });
    router.add(new Manage(this), (state) => {
      return state.isLogiedIn
    });
    router.add(new Editor(this), (state) => {
      return state.isLogiedIn
    });
    router.add(new Viewer(this), (state) => {
      return state.isLogiedIn
    });
    router.add(new Register(this), (state) => {
      return state.isLogiedIn
    });
    this.layout.setMenuList(router.getMenuList());
  }
  start() {
    let search = location.search;
    let nextView = this.router.filter(this.state, search);
    this.layout.init(nextView, this.state);
  }
  async registerUser(userId, password) {
    await ECIDBEMfunc.signup(userId, password);
  }
  async login(userId, password) {
    return await ECIDBEMfunc.signin(userId, password);
  }
  async activste() {
    await ECIDBEMfunc.activate(userId, password);
  }
  /*
   */
  async getCurrentState() {
    let retState = this.state ? this.state : new State();
    //alert ('ECIDBEMfunc;'+ECIDBEMfunc);
    retState.isLogedIn = await ECIDBEMfunc.isLogedIn();
    retState.isActivated = await ECIDBEMfunc.isActivate();
    this.state = retState;
    return retState;
  }
  async isLogiedIn() {
    return await ECIDBEMfunc.isLogedIn();
  }
  async createEntityManager() {
    if (await this.isLogiedIn()) {
      return new Query(isOnTranzaction, this.dbScanner);
    }
    return null;
  }

  async goToNext(key) {
    let state = await this.getCurrentState();
    let page = this.router.getPage(state, key);
    page.show();
    return;
  }
  async geToAnotherPage(currentVnode, key, data) {
    let state = await this.getCurrentState();
    let page = this.router.getPage(state, key);
    page.show(currentVnode, state, data);
    // TODO add history recording
    return;
  }
  async loadState() {
    let retState = this.state ? this.state : new State();
    retState.isLogiedIn = await ECIDBEMfunc.isLogedIn();
    this.state = retState;
    return retState;
  }
  getRouter(){
    return this.router;
  }
}
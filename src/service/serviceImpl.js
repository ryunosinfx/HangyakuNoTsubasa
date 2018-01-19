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
  constructor(layout,state) {
    this.layout = layout;
    this.state = vstate;
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
    let nextView = router.filter(this.state, search);
    ths.layout.init(nextView, state);
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
    retState.isLogedIn = await ECIDBEMfunc.isLogedIn();
    retState.isActivated = await ECIDBEMfunc.isActivated();
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
    let page = router.getPage(state, key);
    page.show();
    return;
  }
    async geToAnotherPage(currentVnode,key,data) {
      let state = await this.getCurrentState();
      let page = router.getPage(state, key);
      page.show(node, state, data);
      // TODO add history recording
      return;
    }
  async loadState() {
    let retState = this.state ? this.state : new State();
    retState.isLogiedIn = await ECIDBEMfunc.isLogedIn();
    this.state = retState;
    return retState;
  }
}

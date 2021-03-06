import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/searcher'
import Viewer from '../view/viewer'
import Logout from '../view/logout'
import Register from '../view/register'
import Router from '../util/router'
import Layout from '../view/parts/layout'
import State from './state'
import BaseService from '../fw/baseService'

export default class ServiceImpl extends BaseService{
  constructor(state) {
    super(state);
    this.router.add(new Login(this), (state) => {
      return state.isLogiedIn === false
    });
    this.router.add(new Logout(this), (state) => {
      return state.isLogiedIn
    });
    this.router.add(new Activate(this), (state) => {
      return state.isActivated === false
    });
    this.router.add(new Viewer(this), (state) => {
      return state.isLogiedIn
    });
    this.router.add(new Manage(this), (state) => {
      return state.isLogiedIn
    });
    this.router.add(new Editor(this), (state) => {
      return state.isLogiedIn
    });
    this.router.add(new Viewer(this), (state) => {
      return state.isLogiedIn
    });
    this.router.add(new Register(this), (state) => {
      return state.isLogiedIn === false
    });
    this.layout.setMenuList(this.router.getMenuList());
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
  async logout() {
    return await ECIDBEMfunc.signout();
  }
  async activate(userId, password) {
    await ECIDBEMfunc.activate(userId, password);
  }
  /*
   */
  async getCurrentState() {
    let retState = this.state ? this.state : new State();
    retState.isLogedIn = await ECIDBEMfunc.isLogedIn();
    retState.isActivated = retState.isLogedIn;
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
    let view = this.router.getView(state, key);
    view.show();
    return;
  }
  async goToAnotherView(key, data) {
    let state = await this.getCurrentState();
    this.store.set('state',state);
    let view = this.router.getView(state, key);
    console.log('ServiceImpl geToAnotherView view:' + view.name + '/state:' + JSON.stringify(state) + '/data:' + JSON.stringify(data));
    //  view.show(currentVnode, state, data);
    // TODO add history recording
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

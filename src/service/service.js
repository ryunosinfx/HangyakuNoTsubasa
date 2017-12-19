import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/searcher'
import Viewer from '../view/viewer'
import Router from '../util/router'
import Layout from '../view/parts/layout'
import State from './state'

const layout =new Layout();
const router = new Router(layout);
const state =new State();
export default class Servicess {
  constructor() {
    router.add(new Login(), (state) => {
      return state.isLogiedIn === false
    });
    router.add(new Activate(), (state) => {
      return state.isActivated === false
    });
    router.add(new Viewer(), (state) => {
      return state.isLogiedIn
    });
    router.add(new Manage(), (state) => {
      return state.isLogiedIn
    });
    router.add(new Editor(), (state) => {
      return state.isLogiedIn
    });
    router.add(new Viewer(), (state) => {
      return state.isLogiedIn
    });
    layout.setMenuList(router.getMenuList());
  }
  start(){
    let search = location.search;

    let nextView = router.filter(state, search);
    layout.init(nextView);

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
    let rettState = new State();
    rettState.isLogedIn = await ECIDBEMfunc.isLogedIn();
    rettState.isActivated = await ECIDBEMfunc.isActivated();
    return rettState;
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
  async loadState() {
    let state = new State();
    state.isLogiedIn = await ECIDBEMfunc.isLogedIn();
    return state;
  }
}

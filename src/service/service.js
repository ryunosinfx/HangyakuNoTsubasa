
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/functions'
import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/search'
import Viewer from '../view/viewer'
import Router from '../utilstate/router'
import State from './state'

const router = new Router();
export default class Servicess {
  constructor() {
    router.add(new Login());
    router.add(new Activate());
    router.add(new Viewer());
    router.add(new Manage());
    router.add(new Editor());
    router.add(new Viewer());
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
  async isLogiedIn() {
    return await ECIDBEMfunc.isLogedIn();
  }
  async createEntityManager() {
    if (await this.isLogiedIn()) {
      return new Query(isOnTranzaction, this.dbScanner);
    }
    return null;
  }

  async goToNext（ key） {
    let state = await this.loadState();
    let page = router.getPage(state);
    return;
  }
  async loadState(){
    let state = new State();
    state.isLogiedIn = await ECIDBEMfunc.isLogedIn();
    return state;
}

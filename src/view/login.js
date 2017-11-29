import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Login extends BaseView {
  constructor() {
    super.constructor();
    this.currentVnode = '';
  }
  show(){
      return this.currentVnode;
  }

  async login(userId,Password){
    await ECIDBEMfunc.signin(userId,Password);
    return await ECIDBEMfunc,isLogiedIn();
  }
}

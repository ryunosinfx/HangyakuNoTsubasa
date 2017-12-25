import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Login extends BaseView {
  constructor() {
    super('Login','Login');
  }

  show(node, viewState) {
    let newNode = this.crateVnode(viewState);
    if (node !== null && this.currentVnode === null) {
      patch(node, newNode);
    }else{
      patch(this.currentVnode, newNode);
    }
    this.currentVnode = newNode;
  }

  crateVnode(viewState) {

    console.log('Login.crateVnode');
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am Login')
    ]);
    return newVnode;
  }
  async login(userId,Password){
    await ECIDBEMfunc.signin(userId,Password);
    return await ECIDBEMfunc,isLogiedIn();
  }
}

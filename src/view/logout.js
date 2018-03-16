import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './parts/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Logout extends BaseView {
  constructor(service) {
    super(service, 'Logout','Logout');
  }

  createVnode(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#00a'
      }
    }, [h('h1', 'i am Logout!')]);
    return newVnode;
  }
  onPageShown(newNode, viewState, data) {
    ECIDBEMfunc.signout().then(
      ()=>{
        this.goToAnotherPage('Login');
      }
    )
  }
}

import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './parts/baseView'
import css from './parts/css'
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
  onPageShown(viewState, data) {
    this.service.logout().then(
      ()=>{
        this.goToAnotherPage('Login');
      }
    )
  }
  isAccessable(state){
    return (state && state.isLogedIn);
  }
}

import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './parts/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Manager extends BaseView {
  constructor(service) {
    super(service, 'Manager','Manager');
  }

  cresateVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#a00'
      }
    }, [h('h1', 'i am Manager!')]);
    return newVnode;
  }
  isAccessable(state){
    return (state && state.isLogedIn);
  }

  createList(){
    //select data
  }
}

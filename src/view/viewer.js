import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './parts/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Viewer extends BaseView {
  constructor(service) {
    super(service, 'Viewer','Viewer');
  }

  rendarer(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#00a'
      }
    }, [h('h1', 'i am Viewer!')]);
    return newVnode;
  }
  isAccessable(state){
    return (state && state.isLogedIn);
  }
}

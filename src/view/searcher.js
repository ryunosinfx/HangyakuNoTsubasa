import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../fw/view/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Searcher extends BaseView {
  constructor(service) {
    super(service, 'Searcher','Searcher');
  }

  render(oldNode, viewState) {
    let newVnode = h('div', {
      style: {
        color: '#0a0'
      }
    }, [h('h1', 'i am Search!')]);
    return newVnode;
  }
  isAccessable(state){
    return (state && state.isLogedIn);
  }
}

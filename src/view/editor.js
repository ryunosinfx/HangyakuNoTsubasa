import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../fw/view/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Editor extends BaseView {
  constructor(service) {
    super(service, 'Editor','Editor');
  }

  render(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#990'
      }
    }, [h('h1', 'i am Editor!')]);
    return newVnode;
  }
  load(key) {}
  save() {}
  undo() {}
  redo() {}
  record() {}
  isAccessable(state){
    return (state && state.isLogedIn);
  }
}

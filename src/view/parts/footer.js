import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import css from './css'
export default class Footer extends BaseView {
  constructor(service,layoutView) {
    super(service);
    this.layoutView = layoutView;
    this.currentVnode = null;
  }
  createVnode(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am footer!!')
    ]);
    return newVnode;
  }
}

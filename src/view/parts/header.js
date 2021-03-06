import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../../fw/view/baseView'
import css from './css'
export default class Header extends BaseView {
  constructor(service,layoutView) {
    super(service,'Header','Header');
    this.layoutView = layoutView;
    this.currentVnode = null;
  }
  render(viewState) {
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am header'),
      h('div', [
        h('span', 'login:'),
        h('span', 'activate:')
      ])
    ]);;
    return newVnode;
  }
}

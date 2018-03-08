import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Activate extends BaseView {
  constructor(service) {
    super(service, 'Activate', 'Activate');
  }
  crateVnode(viewState) {
    const self = this;
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [
      h('h1', 'i am activate!'),
      h('div', 'Secondary step let`s activate! Please, input same values again.'),
      h('div#activateInputArea', {}, [
        h('div', {}, [
          h('span', "id"),
          h('input#activateId', {
            props: {
              type: 'text',
              name: 'ID',
              value: "aaaaz"
            }
          }, 'bbbb')
        ]),
        h('div', {}, [
          h('span', "password"),
          h('input#activatePasswd', {
            props: {
              type: 'password',
              name: 'passwd',
              value: "aaaa"
            }
          }, '')
        ], 'aaaa'),
        h('div', {}, [
          h('button', {
            props: {},
            on: {
              click: self.activate()
            }
          }, "Activate!")
        ], 'cccc')
      ])
    ]);

    return newVnode;
  }
  activate() {
    let self = this;
    return (event) => {
      //alert('ok!');
      let pwNode = this.es.getElementById(this.currentVnode, "activatePasswd");
      let idNode = this.es.getElementById(this.currentVnode, "activateId");
      let activateId = idNode.elm.value;
      let activatePasswd = pwNode.elm.value;
      alert('ok! ga Activate! pwNode:' + activatePasswd + '/idNode:' + activateId);
      if (!!activateId && !!activatePasswd) {
        this.registerActivate(activateId, activatePasswd);
      } else {
        alert("not empty!");
      }
      event.stopPropagation();
      return false;
    }
  }
  async registerActivate(userId, passwd) {
    let isNotActivated = await ECIDBEMfunc.activate(userId, passwd);
    console.log("Activate! isNotActivated:" + isNotActivated);
    if (isNotActivated) {
      this.showResult();
      this.goToAnotherPage('Login', {
        isNotActivated: isNotActivated
      });
    }
  }
  showResult() {
    let resultNode = h('h1#activateInputArea', 'ok!');
    this.patch(this.currentVnode,"#activateInputArea",resultNode);
  }
}

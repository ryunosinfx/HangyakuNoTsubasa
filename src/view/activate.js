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
    let newVnode = h('div', {
      style: {
        color: '#099'
      }
    }, [
      h('h1', 'i am activate!'),
      h('div', 'Secondary step let`s activate!'),
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
              click: self.activste()
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
      let pwNode = this.es.getElementById(this.currentVnode, "activstePasswd");
      let idNode = this.es.getElementById(this.currentVnode, "activsteId");
      let activsteId = idNode.elm.value;
      let activstePasswd = pwNode.elm.value;
      alert('ok! pwNode:' + activstePasswd + '/idNode:' + activsteId);
      if (!!activsteId && !!activstePasswd) {
        this.registerActivate(activsteId, activstePasswd);
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
      this.geToAnotherPage('Login', {
        isNotActivated: isNotActivated
      });
    }
  }
  showResult() {
    let resultNode = h('h1#activateInputArea', 'ok!');
    let activateInputArea = this.es.getElementById(this.currentVnode, "activateInputArea");
    this.patch(activateInputArea, resultNode);
  }
}
